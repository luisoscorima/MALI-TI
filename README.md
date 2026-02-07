# MALI-TI: Soluciones Digitales para el Museo de Arte de Lima

![MALI Logo](https://mali-assets.s3.us-east-1.amazonaws.com/assets-web-mali/Logo_MALI_Blanco.png)

## Descripción

**MALI-TI** es un repositorio de soluciones digitales pequeñas y medianas para diversas áreas del **Museo de Arte de Lima**. Funciona como laboratorio de desarrollo y prueba de interfaces para:

- Biblioteca MALI
- Educación MALI
- Colección MALI
- Historias
- Archivo de Arte Peruano
- Sistemas internos

## 📁 Estructura del Proyecto

```
MALI-TI/
├── README.md                          # Este archivo
├── .github/
│   └── workflows/                     # GitHub Actions
│       ├── deploy.yml
│       └── ci.yml
├── Dockerfile                         # Configuración Docker
├── docker-compose.yml                 # Orquestación de contenedores
├── mali/
│   ├── biblioteca/                    # Soluciones Biblioteca
│   │   ├── interfaz-sistemas.html     # Carrusel de sistemas (pantalla completa)
│   │   └── interfaz-sistemas2.html    # Portal de bienvenida
│   ├── educacion/                     # Soluciones Educación
│   │   ├── calendario.html            # Calendario interactivo
│   │   ├── mapa.html                  # Mapa de sedes
│   │   ├── selector-sedes.html        # Selector de ubicaciones
│   │   └── mapa_conf.js               # Configuración de mapas
│   └── carrusel/                      # Componentes reutilizables
│       └── interfaz-sistemasvarios.html
├── servers/                           # Utilidades de servidor
│   └── servidores.html
├── styles.css                         # Estilos globales
├── modal.js                           # Componentes modales
└── index.html                         # Página principal
```

## 🚀 Despliegue y CI/CD

### GitHub Actions

GitHub Actions automatiza el despliegue a un contenedor Docker en AWS EC2 con cada push a `main`.

El proyecto utiliza **GitHub Actions** para automatizar:

1. **Tests y validación** de código
2. **Build** automático de la aplicación
3. **Deploy** a AWS EC2 mediante Docker

## 🌐 Acceso a las Soluciones

Todas las soluciones están disponibles en:

```
https://proyectosti.mali.pe/projects/
├── /mali/biblioteca/interfaz-sistemas.html     # Carrusel principal
├── /mali/biblioteca/interfaz-sistemas2.html    # Portal de sistemas
├── /mali/educacion/calendario.html             # Calendario
├── /mali/educacion/mapa.html                   # Mapa de sedes
└── /servers/servidores.html                    # Dashboard de servidores
```

## Tecnologías

- **HTML5 / CSS3 / JavaScript vanilla**
- **Swiper** - Carruseles y sliders
- **GSAP** - Animaciones avanzadas
- **GitHub Actions** - CI/CD automático
- **Docker** - Despliegue en AWS EC2

---

**Desarrollado por:** Luis Gustavo Oscorima Palomino | Museo de Arte de Lima © 2025
