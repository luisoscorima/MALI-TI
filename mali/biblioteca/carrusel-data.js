// Datos centralizados para cada ítem del carrusel.
// 1. Para agregar un nuevo libro duplica uno de los objetos y actualiza sus campos.
// 2. Mantén las URLs completas (empiezan con https://). Si no tienes fondo usa el mismo valor que imageSrc.
// 3. Puedes usar etiquetas simples como <i> en descriptionHtml si necesitas cursivas.
const MALI_CAROUSEL_ITEMS = [
  {
    title: "Perfil de la mujer peruana 1980-1981",
    subtitle: "Burga, Teresa.",
    descriptionHtml: "Burga, Teresa; Cathela, Marie-France <i>Perfil de la mujer peruana 1980-1981.</i> [1981-1982].",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=14447",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1303",
    imageAlt: "Perfil de la mujer peruana 1980-1981",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1303"
  },
  {
    title: "Rosario: historia de una niña",
    subtitle: "Wiesse, María.",
    descriptionHtml: "Wiesse, María, Fernando. <i>Rosario: historia de una niña.</i> 1929.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=17544",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1275",
    imageAlt: "Rosario: historia de una niña",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1275"
  },
  {
    title: "Latin American women artists 1915-1995 = Artistas latinoamericanas",
    subtitle: "Rodríguez, Bélgica [et al].",
    descriptionHtml: "Rodríguez, Bélgica [et al]. <i>Latin American women artists 1915-1995 = Artistas latinoamericanas.</i> 1995.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=17912",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=230",
    imageAlt: "Latin American women artists 1915-1995 = Artistas latinoamericanas",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=230"
  },
  {
    title: "Mulheres radicais: arte latino-americana, 1960-1985",
    subtitle: "Giunta, Andrea, [et al].",
    descriptionHtml: "Giunta, Andrea, [et al]. <i>Mulheres radicais: arte latino-americana, 1960-1985.</i> 2018.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=18266",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=200",
    imageAlt: "Mulheres radicais: arte latino-americana, 1960-1985",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=200"
  },
  {
    title: "Resistir el paso del tiempo y la pérdida de la memoria. Intimidad y poder a través del retrato pictórico femenino en el Perú decimonónico",
    subtitle: "Leonardini, Nanda.",
    descriptionHtml: "Leonardini, Nanda. <i>Resistir el paso del tiempo y la pérdida de la memoria. Intimidad y poder a través del retrato pictórico femenino en el Perú decimonónico.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19798",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1301",
    imageAlt: "Resistir el paso del tiempo y la pérdida de la memoria",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1301"
  },
  {
    title: "Histórias das mulheres, histórias feministas",
    subtitle: "Leme, Mariana [et al.].",
    descriptionHtml: "Leme, Mariana [et al.]. <i>Histórias das mulheres, histórias feministas.</i> 2019.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19258",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=479",
    imageAlt: "Histórias das mulheres, histórias feministas",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=479"
  },
  {
    title: "Pensar todo de nuevo",
    subtitle: "Giunta, Andrea.",
    descriptionHtml: "Giunta, Andrea. <i>Pensar todo de nuevo.</i> 2021.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19229",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=458",
    imageAlt: "Pensar todo de nuevo",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=458"
  },
  {
    title: "WACK!: art and the feminist revolution.",
    subtitle: "Butler, Cornelia.",
    descriptionHtml: "Butler, Cornelia. <i>WACK!: art and the feminist revolution.</i> 2007.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=11424",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1286",
    imageAlt: "WACK!: art and the feminist revolution.",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1286"
  },
  {
    title: "Virginia Pérez-Ratton. Centroamérica: deseo de lugar = Central America: Desiring a Place",
    subtitle: "López, Miguel A. [et al.].",
    descriptionHtml: "López, Miguel A. [et al.]. <i>Virginia Pérez-Ratton. Centroamérica: deseo de lugar = Central America: Desiring a Place.</i> 2019.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19811",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1373",
    imageAlt: "Virginia Pérez-Ratton. Centroamérica: deseo de lugar",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1373"
  },
  {
    title: "El arte peruano en la escuela",
    subtitle: "Izcue, Elena.",
    descriptionHtml: "Izcue, Elena. <i>El arte peruano en la escuela.</i> [ca. 1924-1925].",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=6021",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1288",
    imageAlt: "El arte peruano en la escuela",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1288"
  },
  {
    title: "Sara Flores: non nete",
    subtitle: "Lerner, Sharon.",
    descriptionHtml: "Lerner, Sharon. <i>Sara Flores: non nete.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19819",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1381",
    imageAlt: "Sara Flores: non nete",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1381"
  },
  {
    title: "Agentas culturales del siglo XX. Desafíos de una gestión",
    subtitle: "De la Torre, Graciela.",
    descriptionHtml: "De la Torre, Graciela. <i>Agentas culturales del siglo XX. Desafíos de una gestión.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19829",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1392",
    imageAlt: "Agentas culturales del siglo XX",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1392"
  },
  {
    title: "Mariella Agois. Sistemas geométricos",
    subtitle: "Villacorta, Jorge [ed.].",
    descriptionHtml: "Villacorta, Jorge [ed.]. <i>Mariella Agois. Sistemas geométricos.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19685",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1152",
    imageAlt: "Mariella Agois. Sistemas geométricos",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1152"
  },
  {
    title: "Beatriz González: guerra y paz: una poética del gesto",
    subtitle: "Medina, Cuauhtémoc.",
    descriptionHtml: "Medina, Cuauhtémoc. <i>	Beatriz González: guerra y paz: una poética del gesto.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19607",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1015",
    imageAlt: "Beatriz González: guerra y paz: una poética del gesto",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1015"
  },
  {
    title: "Cecilia Vicuña. Veroír el fracaso iluminado",
    subtitle: "López, Miguel [ed.].",
    descriptionHtml: "López, Miguel [ed.]. <i>Cecilia Vicuña. Veroír el fracaso iluminado.</i> 2021.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19986",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1650",
    imageAlt: "Cecilia Vicuña. Veroír el fracaso iluminado",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1650"
  },
  {
    title: "Cecilia Vicuña. Veroír el fracaso iluminado = Seehearing the Enlightened Failure",
    subtitle: "López, Miguel [ed.].",
    descriptionHtml: "López, Miguel [ed.]. <i>Cecilia Vicuña. Veroír el fracaso iluminado = Seehearing the Enlightened Failure.</i> 2020.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19987",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1651",
    imageAlt: "Cecilia Vicuña. Veroír el fracaso iluminado = Seehearing the Enlightened Failure",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1651"
  },
  {

    title: "Annemarie Heinrich: intenciones secretas",
    subtitle: "Cortés-Rocca, Paola.",
    descriptionHtml: "Cortés-Rocca, Paola. <i>Annemarie Heinrich: intenciones secretas.</i> 2015.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19459",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=812",
    imageAlt: "Annemarie Heinrich: intenciones secretas",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=812"
  },
  {
    title: "La equilibrista: Teresa Burga",
    subtitle: "López, Miguel [et al].",
    descriptionHtml: "López, Miguel [et al]. <i>La equilibrista: Teresa Burga</i> 2022.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19423",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=648",
    imageAlt: "La equilibrista: Teresa Burga",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=648"
  },
  {
    title: "Peruanos Power: Tilsa Tsuchiya",
    subtitle: "Varillas, Jenny.",
    descriptionHtml: "Varillas, Jenny. <i>Peruanos Power: Tilsa Tsuchiya.</i> 2022.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19283",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=590",
    imageAlt: "Peruanos Power: Tilsa Tsuchiya",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=590"
  },
  {
    title: "Lo que piensan las mujeres",
    subtitle: "Aramburú Lecaros, Helena.",
    descriptionHtml: "Aramburú Lecaros, Helena. <i>Lo que piensan las mujeres.</i> 1949.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=18385",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1304",
    imageAlt: "Lo que piensan las mujeres",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1304"
  },
  {
    title: "Sandra Gamarra. Producción/Reproducción: Una donación del LIMAC al MALI",
    subtitle: "Lerner, Sharon [et al.].",
    descriptionHtml: "Lerner, Sharon [et al.]. <i>Sandra Gamarra. Producción/Reproducción: Una donación del LIMAC al MALI.</i> 2021.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19350",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=537",
    imageAlt: "Sandra Gamarra. Producción/Reproducción: Una donación del LIMAC al MALI",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=537"
  },
  {
    title: "Mujeres de qallwa. Sáberes del arte textil de San Miguel de Pallaques (Cajamarca)",
    subtitle: "Quiroz Malca, Haydée.",
    descriptionHtml: "Quiroz Malca, Haydée. <i>Mujeres de qallwa. Sáberes del arte textil de San Miguel de Pallaques (Cajamarca).</i> 2021.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19321",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=522",
    imageAlt: "Mujeres de qallwa. Sáberes del arte textil de San Miguel de Pallaques (Cajamarca)",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=522"
  },
  {
    title: "Jardín de esculturas de Marina Núñez del Prado",
    subtitle: ".",
    descriptionHtml: "<i>Jardín de esculturas de Marina Núñez del Prado.</i> 1989.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=6028",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1743",
    imageAlt: "Jardín de esculturas de Marina Núñez del Prado",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1743"
  },
  {
    title: "Cristina Gálvez",
    subtitle: "Villacorta, Jorge.",
    descriptionHtml: "Villacorta, Jorge. <i>Cristina Gálvez.</i> 2009.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=11798",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1744",
    imageAlt: "Cristina Gálvez",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1744"
  },
  {
   
    title: "En la vanguardia indigenista: la portada de Julia Codesido para los Siete ensayos de interpretación de la realidad peruana",
    subtitle: "Majluf, Natalia.",
    descriptionHtml: "Majluf, Natalia. <i>En la vanguardia indigenista: la portada de Julia Codesido para los Siete ensayos de interpretación de la realidad peruana.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19837",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1400",
    imageAlt: "En la vanguardia indigenista",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1400"
  },
  {

    title: "Cristina Flores Pescorán. Las predicciones",
    subtitle: "López, Miguel A.",
    descriptionHtml: "López, Miguel A. <i>Cristina Flores Pescorán. Las predicciones.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19847",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1412",
    imageAlt: "Cristina Flores Pescorán. Las predicciones",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1412"
  },
  {
    title: "Johanna Hamann: Antológica 1977-2015",
    subtitle: "Lerner, Sharon.",
    descriptionHtml: "Lerner, Sharon. <i>Johanna Hamann: Antológica 1977-2015.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=17576",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1745",
    imageAlt: "Johanna Hamann: Antológica 1977-2015",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1745"
  }
];

window.MALI_CAROUSEL_ITEMS = MALI_CAROUSEL_ITEMS;
