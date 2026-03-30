(function () {
  "use strict";

  const UMBRAL_PANEL = {
    verdeDesde: 80,
    amarilloDesde: 60,
  };

  /** Tramos [max inclusive, puntaje]. Si la desviación supera todos los max, usa el último puntaje. */
  const TRAMOS_DESVIACION_PRESUPUESTO = [
    { max: 0.1, puntaje: 100 },
    { max: 0.2, puntaje: 85 },
    { max: 0.35, puntaje: 70 },
    { puntaje: 50 },
  ];

  const TRAMOS_DESVIACION_PLAZO = [
    { max: 0.1, puntaje: 100 },
    { max: 0.25, puntaje: 85 },
    { max: 0.5, puntaje: 70 },
    { puntaje: 50 },
  ];

  /**
   * Convierte desviación relativa (decimal, ej. 0.12 = 12%) en puntaje 0–100 por tramos.
   * @param {number} d desviación ≥ 0
   * @param {{ max?: number, puntaje: number }[]} tramos
   */
  function puntajePorTramosDesviacion(d, tramos) {
    const x = Math.max(0, d);
    for (let i = 0; i < tramos.length; i++) {
      const t = tramos[i];
      if (t.max === undefined) return t.puntaje;
      if (x <= t.max) return t.puntaje;
    }
    return tramos[tramos.length - 1].puntaje;
  }

  function calcCumplimientoPresupuesto(plan, real) {
    if (!plan || plan <= 0) return 0;
    const d = Math.abs(real - plan) / plan;
    return puntajePorTramosDesviacion(d, TRAMOS_DESVIACION_PRESUPUESTO);
  }

  function calcCumplimientoPlazo(plan, real) {
    if (!plan || plan <= 0) return 0;
    if (real <= plan) return 100;
    const d = (real - plan) / plan;
    return puntajePorTramosDesviacion(d, TRAMOS_DESVIACION_PLAZO);
  }

  function calcCumplimientoRequisitos(comprometidos, cumplidos) {
    if (!comprometidos || comprometidos <= 0) return 0;
    return Math.min(100, (cumplidos / comprometidos) * 100);
  }

  const FUNCIONAMIENTO_VALORES = [100, 80, 60, 40, 20];
  const ACEPTACION_VALORES = [100, 75, 50];

  function round2(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  /** Puntaje 0–100 según incidencias críticas (40% del indicador Calidad). */
  function calcularIncidencias(n) {
    const x = Number(n) || 0;
    if (x <= 2) return 100;
    if (x <= 5) return 80;
    if (x <= 8) return 65;
    return 50;
  }

  /** Valor del select funcionamiento (60% del indicador Calidad). Sin dato válido → 100. */
  function calcularFuncionamiento(p) {
    const v = Number(p.funcionamiento_producto);
    if (FUNCIONAMIENTO_VALORES.includes(v)) return v;
    return 100;
  }

  /** Calidad = funcionamiento × 0.6 + incidencias × 0.4 (hasta 2 decimales). */
  function calcularCalidad(p) {
    const func = calcularFuncionamiento(p);
    const inc = calcularIncidencias(p.incidencias_criticas);
    return round2(func * 0.6 + inc * 0.4);
  }

  const indicators = [
    {
      key: "definicion_inicial",
      dimension: "Planificación",
      name: "Definición inicial del proyecto",
      queMide: "Qué tan claro arrancó el proyecto en objetivo, alcance, responsables y entregables.",
      frecuencia: "Inicio / diagnóstico",
      meta: "≥ 75%",
      pesoTI: 10,
      pesoGerencia: null,
      criterio:
        "Porcentaje ingresado en carga (0–100). No entra en el puntaje global de Gerencia; solo en el de TI.",
      presentacion: false,
    },
    {
      key: "presupuesto",
      dimension: "Planificación",
      name: "Cumplimiento de presupuesto",
      queMide: "Qué tan alineado estuvo el costo real respecto al presupuesto previsto.",
      frecuencia: "Inicio y actualización por hito",
      meta: "Desviación ≤ 10%",
      pesoTI: 10,
      pesoGerencia: 15,
      criterio:
        "Desviación = |presupuesto real − presupuesto planificado| ÷ presupuesto planificado. Puntaje: desviación ≤ 10% → 100; >10% y ≤20% → 85; >20% y ≤35% → 70; >35% → 50. Sin planificado: 0.",
      presentacion: true,
    },
    {
      key: "plazo",
      dimension: "Ejecución",
      name: "Cumplimiento de plazo",
      queMide: "Qué tan alineado estuvo el proyecto respecto al cronograma previsto.",
      frecuencia: "Mensual o por hito",
      meta: "Desviación ≤ 10%",
      pesoTI: 20,
      pesoGerencia: 25,
      criterio:
        "Si plazo real ≤ planificado → 100. Si hay retraso: desviación = (real − plan) ÷ plan. Puntaje: desviación ≤10% → 100; >10% y ≤25% → 85; >25% y ≤50% → 70; >50% → 50. Sin planificado: 0.",
      presentacion: true,
    },
    {
      key: "requisitos",
      dimension: "Producto",
      name: "Cumplimiento de requisitos",
      queMide: "Qué tanto de lo solicitado o comprometido quedó implementado.",
      frecuencia: "Mensual o cierre de fase",
      meta: "≥ 85%",
      pesoTI: 25,
      pesoGerencia: 25,
      criterio: "(Requisitos cumplidos ÷ requisitos comprometidos) × 100, tope 100. Sin comprometidos: 0.",
      presentacion: true,
    },
    {
      key: "calidad",
      dimension: "Producto",
      name: "Calidad",
      queMide:
        "Qué tan bien funciona el producto en operación, considerando tanto las incidencias críticas registradas como la evaluación general de su funcionamiento en producción.",
      frecuencia: "Mensual",
      meta: "Alto nivel de funcionamiento y baja incidencia de fallas críticas",
      pesoTI: 20,
      pesoGerencia: 20,
      criterio:
        "Combinación ponderada de: incidencias críticas del período (40%); valoración del funcionamiento del producto (60%). Fórmula: (funcionamiento × 0.6) + (puntaje incidencias × 0.4), redondeo a 2 decimales. Tramos incidencias: 0–2→100, 3–5→80, 6–8→65, &gt;8→50. Funcionamiento: lista 100 / 80 / 60 / 40 / 20.",
      presentacion: true,
    },
    {
      key: "aceptacion",
      dimension: "Usuario",
      name: "Aceptación del usuario",
      queMide: "Qué tan conforme está el usuario con el resultado entregado.",
      frecuencia: "Cierre y seguimiento mensual",
      meta: "≥ 80%",
      pesoTI: 15,
      pesoGerencia: 15,
      criterio: "Selección en carga: Conforme (100), Conforme con observaciones (75), No conforme (50).",
      presentacion: true,
    },
  ];

  const defaultProjects = [
    {
      id: 1,
      nombre: "Web MALI",
      responsable: "Virtuallab + TI",
      observaciones: "",
      definicion_inicial_num: 70,
      presupuesto_plan: 10,
      presupuesto_real: 11,
      plazo_plan: 5,
      plazo_real: 10,
      requisitos_comprometidos: 10,
      requisitos_cumplidos: 8,
      incidencias_criticas: 4,
      funcionamiento_producto: 80,
      aceptacion_usuario: 75,
    },
    {
      id: 2,
      nombre: "Web Educación",
      responsable: "Virtuallab + TI",
      observaciones: "",
      definicion_inicial_num: 100,
      presupuesto_plan: 10,
      presupuesto_real: 10,
      plazo_plan: 3,
      plazo_real: 5,
      requisitos_comprometidos: 18,
      requisitos_cumplidos: 16,
      incidencias_criticas: 1,
      funcionamiento_producto: 100,
      aceptacion_usuario: 100,
    },
    {
      id: 3,
      nombre: "LMS Moodle",
      responsable: "Buendata",
      observaciones: "",
      definicion_inicial_num: 100,
      presupuesto_plan: 10,
      presupuesto_real: 11,
      plazo_plan: 3,
      plazo_real: 3,
      requisitos_comprometidos: 10,
      requisitos_cumplidos: 7,
      incidencias_criticas: 0,
      funcionamiento_producto: 100,
      aceptacion_usuario: 100,
    },
    {
      id: 4,
      nombre: "SIGE",
      responsable: "Experis",
      observaciones: "",
      definicion_inicial_num: 100,
      presupuesto_plan: 10,
      presupuesto_real: 10,
      plazo_plan: 3,
      plazo_real: 3,
      requisitos_comprometidos: 10,
      requisitos_cumplidos: 5,
      incidencias_criticas: 4,
      funcionamiento_producto: 40,
      aceptacion_usuario: 50,
    },
  ];

  function clamp(value, min, max) {
    min = min === undefined ? 0 : min;
    max = max === undefined ? 100 : max;
    return Math.max(min, Math.min(max, value));
  }

  function round(value) {
    return Math.round((value + Number.EPSILON) * 10) / 10;
  }

  function normalizarAceptacionUsuario(p) {
    let raw = p.aceptacion_usuario;
    if (raw === undefined || raw === null || raw === "") {
      raw = p.calificacion_lider_usuario;
    }
    if (raw === undefined || raw === null || raw === "") return 75;
    const n = Number(raw);
    if (!Number.isFinite(n)) return 75;
    if (ACEPTACION_VALORES.includes(n)) return n;
    if (n >= 87.5) return 100;
    if (n >= 62.5) return 75;
    return 50;
  }

  function formatPctCalidad(value) {
    return String(parseFloat(round2(value).toFixed(2)));
  }

  function calculateProject(p) {
    const presupuesto = calcCumplimientoPresupuesto(p.presupuesto_plan, p.presupuesto_real);
    const plazo = calcCumplimientoPlazo(p.plazo_plan, p.plazo_real);
    const requisitos = calcCumplimientoRequisitos(p.requisitos_comprometidos, p.requisitos_cumplidos);
    const calidad = calcularCalidad(p);
    const aceptacion = normalizarAceptacionUsuario(p);
    const definicion = clamp(p.definicion_inicial_num || 0, 0, 100);

    const scoreTI = round(
      definicion * 0.1 +
        presupuesto * 0.1 +
        plazo * 0.2 +
        requisitos * 0.25 +
        calidad * 0.2 +
        aceptacion * 0.15
    );

    const scoreGerencia = round(
      presupuesto * 0.15 + plazo * 0.25 + requisitos * 0.25 + calidad * 0.2 + aceptacion * 0.15
    );

    return {
      ...p,
      calculado: {
        definicion: round(definicion),
        presupuesto: round(presupuesto),
        plazo: round(plazo),
        requisitos: round(requisitos),
        calidad,
        aceptacion,
        scoreTI,
        scoreGerencia,
      },
    };
  }

  function getStatus(score) {
    if (score >= UMBRAL_PANEL.verdeDesde) return { label: "OK", className: "badge-verde" };
    if (score >= UMBRAL_PANEL.amarilloDesde) return { label: "Atención", className: "badge-amarillo" };
    return { label: "Riesgo", className: "badge-rojo" };
  }

  function progressClass(score) {
    if (score >= UMBRAL_PANEL.verdeDesde) return "progress-fill--ok";
    if (score >= UMBRAL_PANEL.amarilloDesde) return "progress-fill--mid";
    return "progress-fill--low";
  }

  function badgeHtml(value) {
    const s = getStatus(value);
    return `<span class="badge ${s.className}">${escapeHtml(s.label)}</span>`;
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function panelBarraTricolorHtml() {
    const v = UMBRAL_PANEL.verdeDesde;
    const a = UMBRAL_PANEL.amarilloDesde;
    return `
      <div class="semaforo-guia semaforo-guia--panel">
        <div class="semaforo-guia-title">Semáforo del panel</div>
        <p class="lectura-intro lectura-intro--tight">Todos los indicadores se expresan en 0–100 y se leen igual:</p>
        <div class="semaforo-bar" role="img" aria-label="Rojo menor a 60, amarillo 60 a 79, verde 80 a 100">
          <div class="semaforo-zona--rojo"></div>
          <div class="semaforo-zona--amarillo"></div>
          <div class="semaforo-zona--verde"></div>
        </div>
        <div class="semaforo-ticks"><span>0</span><span>${a}</span><span>${v}</span><span>100</span></div>
        <div class="semaforo-leyenda">
          <span><span class="dot dot--rojo" aria-hidden="true"></span> Rojo &lt; ${a}&nbsp;%</span>
          <span><span class="dot dot--amarillo" aria-hidden="true"></span> Amarillo ${a}&nbsp;%–${v - 1}&nbsp;%</span>
          <span><span class="dot dot--verde" aria-hidden="true"></span> Verde ${v}–100&nbsp;%</span>
        </div>
      </div>`;
  }

  function lecturaEquivalenciasHtml() {
    const v = UMBRAL_PANEL.verdeDesde;
    const a = UMBRAL_PANEL.amarilloDesde;
    return `
      <div class="lectura-guia">
        <div class="lectura-guia-title">Resumen de la medición (escala 0–100)</div>
        <p class="lectura-intro-principal">
          Cada indicador produce un <strong>puntaje 0–100</strong>. El color (verde ${v}–100, amarillo ${a}–${v - 1}, rojo &lt;${a}) es siempre el mismo sobre ese número.
        </p>
        <div class="lectura-bloque">
          <h3 class="lectura-bloque-title">Cumplimiento de presupuesto</h3>
          <p class="lectura-intro">Desviación = |real − plan| ÷ plan. Puntaje por tramos (no lineal duro): ≤10% → 100; &gt;10–20% → 85; &gt;20–35% → 70; &gt;35% → 50.</p>
        </div>
        <div class="lectura-bloque">
          <h3 class="lectura-bloque-title">Cumplimiento de plazo</h3>
          <p class="lectura-intro">A tiempo o antes → 100. Con retraso: desviación = (real − plan) ÷ plan. ≤10% → 100; &gt;10–25% → 85; &gt;25–50% → 70; &gt;50% → 50.</p>
        </div>
        <div class="lectura-bloque">
          <h3 class="lectura-bloque-title">Requisitos, calidad y aceptación</h3>
          <p class="lectura-intro">Requisitos: % directo (tope 100). Calidad: 60% funcionamiento del producto (lista 100–20) + 40% puntaje por incidencias. Aceptación: Conforme / con observaciones / no conforme (100 / 75 / 50).</p>
        </div>
      </div>`;
  }

  let projects = JSON.parse(JSON.stringify(defaultProjects));
  let selectedId = String(defaultProjects[0].id);
  let lastFormProjectId = null;

  const el = {
    tabCarga: document.getElementById("tab-carga"),
    tabGerencia: document.getElementById("tab-gerencia"),
    panelCarga: document.getElementById("panel-carga"),
    panelGerencia: document.getElementById("panel-gerencia"),
    projectList: document.getElementById("project-list"),
    btnAddProject: document.getElementById("btn-add-project"),
    formArea: document.getElementById("form-area"),
    resultsArea: document.getElementById("results-area"),
    resumenArea: document.getElementById("resumen-area"),
    tableBody: document.getElementById("table-body"),
    legendArea: document.getElementById("legend-area"),
  };

  function computedProjects() {
    return projects.map(calculateProject);
  }

  function selectedProject() {
    const list = computedProjects();
    return list.find((p) => String(p.id) === selectedId) || list[0];
  }

  function resumen() {
    const list = computedProjects();
    if (!list.length) return null;
    const avg = (field) =>
      round(list.reduce((acc, p) => acc + p.calculado[field], 0) / list.length);
    return {
      scoreGerencia: avg("scoreGerencia"),
      presupuesto: avg("presupuesto"),
      plazo: avg("plazo"),
      requisitos: avg("requisitos"),
      calidad: round2(list.reduce((acc, p) => acc + p.calculado.calidad, 0) / list.length),
      aceptacion: avg("aceptacion"),
    };
  }

  function updateProject(id, field, value) {
    const strFields = ["nombre", "responsable", "observaciones"];
    projects = projects.map((item) => {
      if (item.id !== id) return item;
      const v = strFields.includes(field) ? value : value === "" ? 0 : Number(value);
      return { ...item, [field]: v };
    });
    render();
  }

  function addProject() {
    const newId = Date.now();
    projects = [
      ...projects,
      {
        id: newId,
        nombre: "Nuevo proyecto",
        responsable: "",
        observaciones: "",
        definicion_inicial_num: 0,
        presupuesto_plan: 0,
        presupuesto_real: 0,
        plazo_plan: 0,
        plazo_real: 0,
        requisitos_comprometidos: 0,
        requisitos_cumplidos: 0,
        incidencias_criticas: 0,
        funcionamiento_producto: 100,
        aceptacion_usuario: 75,
      },
    ];
    selectedId = String(newId);
    render();
  }

  function setTab(tab) {
    const isCarga = tab === "carga";
    el.tabCarga.classList.toggle("is-active", isCarga);
    el.tabGerencia.classList.toggle("is-active", !isCarga);
    el.tabCarga.setAttribute("aria-selected", isCarga ? "true" : "false");
    el.tabGerencia.setAttribute("aria-selected", isCarga ? "false" : "true");
    el.panelCarga.classList.toggle("is-active", isCarga);
    el.panelGerencia.classList.toggle("is-active", !isCarga);
  }

  function renderProjectList() {
    const list = computedProjects();
    el.projectList.innerHTML = list
      .map((p) => {
        const st = getStatus(p.calculado.scoreTI);
        const sel = selectedId === String(p.id) ? "is-selected" : "";
        return `
        <button type="button" class="project-btn ${sel}" data-project-id="${p.id}">
          <div class="row">
            <div>
              <div class="project-name">${escapeHtml(p.nombre)}</div>
              <div class="project-sub">${escapeHtml(p.responsable || "Sin responsable registrado")}</div>
            </div>
            <span class="badge ${st.className}">${escapeHtml(st.label)}</span>
          </div>
          <div class="project-progress">
            <div class="progress-label">TI</div>
            <div class="progress-track"><div class="progress-fill ${progressClass(p.calculado.scoreTI)}" style="width:${Math.min(100, p.calculado.scoreTI)}%"></div></div>
            <div class="progress-value">${p.calculado.scoreTI}%</div>
          </div>
        </button>`;
      })
      .join("");

    el.projectList.querySelectorAll(".project-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedId = String(btn.getAttribute("data-project-id"));
        render();
      });
    });
  }

  function populateForm(p) {
    const map = [
      ["f-nombre", "nombre"],
      ["f-responsable", "responsable"],
      ["f-definicion", "definicion_inicial_num"],
      ["f-presupuesto-plan", "presupuesto_plan"],
      ["f-presupuesto-real", "presupuesto_real"],
      ["f-plazo-plan", "plazo_plan"],
      ["f-plazo-real", "plazo_real"],
      ["f-req-comp", "requisitos_comprometidos"],
      ["f-req-cum", "requisitos_cumplidos"],
      ["f-incidencias", "incidencias_criticas"],
      ["f-funcionamiento", "funcionamiento_producto"],
      ["f-aceptacion", "aceptacion_usuario"],
    ];
    map.forEach(([id, key]) => {
      const node = document.getElementById(id);
      if (!node) return;
      let val = p[key];
      if (key === "aceptacion_usuario") {
        val = normalizarAceptacionUsuario(p);
      }
      if (key === "funcionamiento_producto") {
        val = calcularFuncionamiento(p);
      }
      node.value = val === undefined || val === null ? "" : String(val);
    });
    const obs = document.getElementById("f-observaciones");
    if (obs) obs.value = p.observaciones || "";
  }

  function renderResults(p) {
    const c = p.calculado;
    const pairs = [
      ["Definición inicial", c.definicion, false],
      ["Cump. presupuesto", c.presupuesto, false],
      ["Cump. plazo", c.plazo, false],
      ["Cump. requisitos", c.requisitos, false],
      ["Calidad", c.calidad, true],
      ["Aceptación", c.aceptacion, false],
    ];

    const cardsHtml = pairs
      .map(
        ([label, value, esCalidad]) => `
      <div class="card card-inner">
        <div class="card-content" style="padding:1rem">
          <div class="text-sm-muted">${escapeHtml(label)}</div>
          <div class="metric-pct text-2xl">${esCalidad ? formatPctCalidad(value) : value}<span class="unit">%</span></div>
          <div style="margin-top:0.45rem">${badgeHtml(value)}</div>
        </div>
      </div>`
      )
      .join("");

    const sg = getStatus(c.scoreGerencia);
    el.resultsArea.innerHTML = `
      <div class="card">
        <div class="card-header"><h2 class="card-title">Resultados del proyecto</h2></div>
        <div class="card-content">
          <div class="grid-results">${cardsHtml}
            <div class="card card-dark span-2 span-3">
              <div class="card-dark-row">
                <div>
                  <div class="muted text-sm-muted">Puntaje TI (6 indicadores)</div>
                  <div class="metric-pct text-3xl">${c.scoreTI}<span class="unit">%</span></div>
                </div>
                <div>
                  <div class="muted text-sm-muted">Puntaje Gerencia (5 indicadores)</div>
                  <div class="metric-pct text-3xl">${c.scoreGerencia}<span class="unit">%</span></div>
                </div>
                <div>
                  <span class="badge ${sg.className} badge-gerencia">${escapeHtml(sg.label)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function pesoGerenciaTexto(pg) {
    if (pg === null || pg === undefined) return "No incluido en global Gerencia";
    return `${pg}%`;
  }

  function renderGerencia() {
    const r = resumen();
    if (!r) {
      el.resumenArea.innerHTML = "";
      el.tableBody.innerHTML = "";
      el.legendArea.innerHTML = "";
      return;
    }

    const resumenItems = [
      ["Cump. presupuesto", r.presupuesto],
      ["Cump. plazo", r.plazo],
      ["Cump. requisitos", r.requisitos],
      ["Calidad", r.calidad],
      ["Aceptación", r.aceptacion],
      ["Global Gerencia", r.scoreGerencia],
    ];

    el.resumenArea.innerHTML = `
      ${panelBarraTricolorHtml()}
      ${lecturaEquivalenciasHtml()}
      <div class="grid-resumen">
        ${resumenItems
          .map(([label, value]) => {
            const globalCls = label === "Global Gerencia" ? " resumen-card--global" : "";
            return `
          <div class="card${globalCls}">
            <div class="card-content">
              <div class="text-sm-muted">${escapeHtml(label)}</div>
              <div class="metric-pct resumen-value">${label === "Calidad" ? formatPctCalidad(value) : value}<span class="unit">%</span></div>
              <div style="margin-top:0.5rem">${badgeHtml(value)}</div>
            </div>
          </div>`;
          })
          .join("")}
      </div>`;

    const list = computedProjects();
    el.tableBody.innerHTML = list
      .map(
        (p) => `
      <tr>
        <td class="font-medium">${escapeHtml(p.nombre)}</td>
        <td>${p.calculado.presupuesto}%</td>
        <td>${p.calculado.plazo}%</td>
        <td>${p.calculado.requisitos}%</td>
        <td>${formatPctCalidad(p.calculado.calidad)}%</td>
        <td>${p.calculado.aceptacion}%</td>
        <td>
          <div class="cell-flex">
            <span>${p.calculado.scoreGerencia}%</span>
            ${badgeHtml(p.calculado.scoreGerencia)}
          </div>
        </td>
      </tr>`
      )
      .join("");

    const leyendaItems = indicators
      .filter((i) => i.presentacion)
      .map((ind) => {
        const pesoG = pesoGerenciaTexto(ind.pesoGerencia);
        return `
      <div class="leyenda-item">
        <div class="head">
          <span class="leyenda-name">${escapeHtml(ind.name)}</span>
          <span class="badge badge-secondary">${escapeHtml(ind.dimension)}</span>
        </div>
        <dl class="leyenda-dl">
          <div class="leyenda-dl-row"><dt>Qué mide</dt><dd>${escapeHtml(ind.queMide)}</dd></div>
          <div class="leyenda-dl-row"><dt>Frecuencia</dt><dd>${escapeHtml(ind.frecuencia)}</dd></div>
          <div class="leyenda-dl-row"><dt>Meta</dt><dd>${escapeHtml(ind.meta)}</dd></div>
          <div class="leyenda-dl-row"><dt>Peso Gerencia</dt><dd>${escapeHtml(pesoG)}</dd></div>
          <div class="leyenda-dl-row"><dt>Criterio</dt><dd>${escapeHtml(ind.criterio)}</dd></div>
        </dl>
      </div>`;
      })
      .join("");

    el.legendArea.innerHTML = leyendaItems;
  }

  function render() {
    renderProjectList();
    const p = selectedProject();
    if (!p) {
      el.formArea.classList.add("hidden");
      el.resultsArea.innerHTML = "";
      lastFormProjectId = null;
      renderGerencia();
      return;
    }
    el.formArea.classList.remove("hidden");
    const pid = String(p.id);
    if (lastFormProjectId !== pid) {
      populateForm(p);
      lastFormProjectId = pid;
    }
    renderResults(p);
    renderGerencia();
  }

  el.btnAddProject.addEventListener("click", addProject);
  el.tabCarga.addEventListener("click", () => setTab("carga"));
  el.tabGerencia.addEventListener("click", () => setTab("gerencia"));

  function onFormFieldChange(e) {
    const t = e.target;
    if (!t.dataset || !t.dataset.field) return;
    const p = selectedProject();
    if (!p) return;
    updateProject(p.id, t.dataset.field, t.value);
  }

  el.formArea.addEventListener("input", onFormFieldChange);
  el.formArea.addEventListener("change", onFormFieldChange);

  setTab("gerencia");
  render();
})();
