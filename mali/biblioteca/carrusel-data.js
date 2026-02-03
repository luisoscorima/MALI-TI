// Datos centralizados para cada ítem del carrusel.
// 1. Para agregar un nuevo libro duplica uno de los objetos y actualiza sus campos.
// 2. Mantén las URLs completas (empiezan con https://). Si no tienes fondo usa el mismo valor que imageSrc.
// 3. Puedes usar etiquetas simples como <i> en descriptionHtml si necesitas cursivas.
const MALI_CAROUSEL_ITEMS = [
  {
    title: "Hew Locke: what have we here?",
    subtitle: "Seligman, Isabel; Khanna, Indra.",
    descriptionHtml: "Seligman, Isabel; Khanna, Indra. <i>Hew Locke: what have we here?.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19992",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1657",
    imageAlt: "Hew Locke: what have we here?",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1657"
  },
  {
    title: "Pintura boliviana del siglo XX",
    subtitle: "Romero Moreno, Fernan.",
    descriptionHtml: "Romero Moreno, Fernando. <i>Pintura boliviana del siglo XX.</i> 1989.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19981",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1643",
    imageAlt: "Pintura boliviana del siglo XX",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1643"
  },
  {
    title: "Pedro Peschiera: Obra reciente = recent work",
    subtitle: "Wiesse, Ricardo.",
    descriptionHtml: "Wiesse, Ricardo. <i>Pedro Peschiera: Obra reciente = recent work.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19983",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1645",
    imageAlt: "Pedro Peschiera: Obra reciente = recent work",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1645"
  },
  {
    title: "Mirando al arte colonial. Arquitectura y arte jesuita en el Virreinato del Perú: un estudio de problemas específicos",
    subtitle: "Kubiak, Ewa.",
    descriptionHtml: "Kubiak, Ewa. <i>Mirando al arte colonial. Arquitectura y arte jesuita en el Virreinato del Perú: un estudio de problemas específicos.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19791",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1295",
    imageAlt: "Mirando al arte colonial. Arquitectura y arte jesuita en el Virreinato del Perú",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1295"
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
    title: "Museo digital: inteligencias y artificios = Digital museum: intelligences and artifices",
    subtitle: "Mariátegui, José-Carlos [et al.].",
    descriptionHtml: "Mariátegui, José-Carlos [et al.]. <i>Museo digital: inteligencias y artificios = Digital museum: intelligences and artifices.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19810",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1372",
    imageAlt: "Museo digital: inteligencias y artificios",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1372"
  },
  {
    title: "\"Nosotros también somos peruanos\": la marginación en el Perú, siglos XVI a XXI",
    subtitle: "Rosas Lauro, Claudia.",
    descriptionHtml: "Rosas Lauro, Claudia. <i>\"Nosotros también somos peruanos\": la marginación en el Perú, siglos XVI a XXI.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19785",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1272",
    imageAlt: "\"Nosotros también somos peruanos\": la marginación en el Perú, siglos XVI a XXI",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1272"
  },
  {
    title: "Th. Cron.",
    subtitle: "Arce, Irene [et al].",
    descriptionHtml: "Arce, Irene [et al]. <i>Th. Cron.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19789",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1293",
    imageAlt: "Th. Cron.",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1293"
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
    title: "Marcelo Brodsky: Exílios, Escombros, Resistências",
    subtitle: "Brodsky, Marcelo.",
    descriptionHtml: "Brodsky, Marcelo. <i>Marcelo Brodsky: Exílios, Escombros, Resistências.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19816",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1378",
    imageAlt: "Marcelo Brodsky: Exílios, Escombros, Resistências",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1378"
  },
  {
    title: "Aby Warburg en/sobre América: Historia, sobrevivencias y repercusiones",
    subtitle: "Báez Rubí, Linda [ed.].",
    descriptionHtml: "Báez Rubí, Linda [ed.]. <i>Aby Warburg en/sobre América: Historia, sobrevivencias y repercusiones.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19828",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1390",
    imageAlt: "Aby Warburg en/sobre América",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1390"
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
    title: "Intelectuales, política y producción cultural en el Perú de los 70",
    subtitle: "Mitrovic Pease, Mijail [ed.].",
    descriptionHtml: "Mitrovic Pease, Mijail [ed.]. <i>Intelectuales, política y producción cultural en el Perú de los 70.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19790",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1294",
    imageAlt: "Intelectuales, política y producción cultural en el Perú de los 70",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1294"
  },
  {
    title: "Pittura coloniale del Perù",
    subtitle: "Belli Barsali, Isa.",
    descriptionHtml: "Belli Barsali, Isa. <i>Pittura coloniale del Perù.</i> 1966.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19984",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1646",
    imageAlt: "Pittura coloniale del Perù",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1646"
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
    title: "Grito: Regina José Galindo",
    subtitle: "Galindo, Regina José.",
    descriptionHtml: "Galindo, Regina José. <i>Grito: Regina José Galindo.</i> 2022.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19990",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1654",
    imageAlt: "Grito: Regina José Galindo",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1654"
  },
  {
    title: "Luis Castellanos: la intuición de la extrañeza. 30 años de trayectoria",
    subtitle: "Castellanos, Luis.",
    descriptionHtml: "Castellanos, Luis. <i>Luis Castellanos: la intuición de la extrañeza. 30 años de trayectoria.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19957",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1615",
    imageAlt: "Luis Castellanos: la intuición de la extrañeza",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1615"
  },
  {
    title: "Painting the Conquest: The Mexican Indians and the European Renaissance",
    subtitle: "Gruzinski, Serge.",
    descriptionHtml: "Gruzinski, Serge. <i>Painting the Conquest: The Mexican Indians and the European Renaissance.</i> 1992.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19931",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1584",
    imageAlt: "Painting the Conquest",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1584"
  },
  {
    title: "In the Light of Italy: Corot and Early Open-Air Painting",
    subtitle: "Conisbee, Philip.",
    descriptionHtml: "Conisbee, Philip. <i>In the Light of Italy: Corot and Early Open-Air Painting.</i> 1996.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19933",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1586",
    imageAlt: "In the Light of Italy",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1586"
  },
  {
    title: "Son encantados",
    subtitle: "Silva Meinel, Javier.",
    descriptionHtml: "Silva Meinel, Javier. <i>Son encantados.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19930",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1583",
    imageAlt: "Son encantados",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1583"
  },
  {
    title: "The First Homosexuals: The Birth of a New Identity, 1869-1939",
    subtitle: "Katz, Jonathan D.",
    descriptionHtml: "Katz, Jonathan D. <i>The First Homosexuals: The Birth of a New Identity, 1869-1939.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19857",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1464",
    imageAlt: "The First Homosexuals",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1464"
  },
  {
    title: "La gran cocina mestiza de Arequipa",
    subtitle: "Ruiz Rosas, Alonso.",
    descriptionHtml: "Ruiz Rosas, Alonso. <i>La gran cocina mestiza de Arequipa.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19864",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1471",
    imageAlt: "La gran cocina mestiza de Arequipa",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1471"
  },
  {
    title: "Itinerarios: 33 ensayos y retratos escritos",
    subtitle: "Wiesse, Ricardo.",
    descriptionHtml: "Wiesse, Ricardo. <i>Itinerarios: 33 ensayos y retratos escritos.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=119867",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1474",
    imageAlt: "Itinerarios: 33 ensayos y retratos escritos",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1474"
  },
  {
    title: "Relecturas del fracaso. Comunidades, género y raza en perspectiva histórica",
    subtitle: "Henderson, Magally Alegre.",
    descriptionHtml: "Henderson, Magally Alegre. <i>Relecturas del fracaso. Comunidades, género y raza en perspectiva histórica.</i> 2024.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19869",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1476",
    imageAlt: "Relecturas del fracaso",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1476"
  },
  {
    title: "El surrealismo y el arte fantástico de México",
    subtitle: "Rodríguez Prampolini, Ida.",
    descriptionHtml: "Rodríguez Prampolini, Ida. <i>El surrealismo y el arte fantástico de México.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19831",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1394",
    imageAlt: "El surrealismo y el arte fantástico de México",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1394"
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
    title: "Arte en las celebraciones centenarias del Perú, 1921-1924",
    subtitle: "Cruz Quintanilla, Pablo.",
    descriptionHtml: "Cruz Quintanilla, Pablo. <i>Arte en las celebraciones centenarias del Perú, 1921-1924.</i> 2025.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19838",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1401",
    imageAlt: "Arte en las celebraciones centenarias del Perú, 1921-1924",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1401"
  },
  {
    title: "Estudios sobre la historia del arte en Chile Republicano",
    subtitle: "Pereira Salas, Eugenio.",
    descriptionHtml: "Pereira Salas, Eugenio. <i>Estudios sobre la historia del arte en Chile Republicano.</i> 1992.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19840",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1403",
    imageAlt: "Estudios sobre la historia del arte en Chile Republicano",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1403"
  },
  {
    title: "Javi Vargas: florecen luces sobre nuestras pieles",
    subtitle: "López, Miguel A. [ed.].",
    descriptionHtml: "López, Miguel A. [ed.]. <i>Javi Vargas: florecen luces sobre nuestras pieles.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19846",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1411",
    imageAlt: "Javi Vargas: florecen luces sobre nuestras pieles",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1411"
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
    title: "Agítese antes de usar. Proximidad y reciprocidad en las prácticas artísticas / educativas",
    subtitle: "López, Miguel A. [ed.].",
    descriptionHtml: "López, Miguel A. [ed.]. <i>Agítese antes de usar. Proximidad y reciprocidad en las prácticas artísticas / educativas.</i> 2023.",
    link: "https://biblioteca.mali.pe/cgi-bin/koha/opac-detail.pl?biblionumber=19850",
    imageSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1415",
    imageAlt: "Agítese antes de usar",
    backgroundSrc: "https://biblioteca.mali.pe/cgi-bin/koha/opac-image.pl?imagenumber=1415"
  }
];

window.MALI_CAROUSEL_ITEMS = MALI_CAROUSEL_ITEMS;
