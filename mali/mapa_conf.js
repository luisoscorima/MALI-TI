// Este archivo contiene la configuración de los enlaces y contactos para la página de contacto del MALI.
  const URLS = {
    BROCHURES: {
      PRINCIPAL: 'https://bit.ly/Horarios-Principal',
      LA_MOLINA: 'https://bit.ly/Horarios-Camacho',
      SAN_MIGUEL: 'https://bit.ly/Horarios-SanMiguel1',
      CHORRILLOS: 'https://bit.ly/Horarios-Chorrillos',
      LOS_OLIVOS: 'https://bit.ly/Horarios-VillaSol',
      SJL: 'https://bit.ly/Horarios-Arabiscos',
      PUEBLO_LIBRE: 'https://bit.ly/Horarios-PuebloLibre',
      VIRTUAL: 'https://bit.ly/Virtual-Abril'
    },
    IMAGES: {
      RECTANGULO: '../mali/img/Rectangulo.png',
      WHATSAPP: '../mali/img/WhatsApp.png',
      CORREO: '../mali/img/correo.png',
    },
    CONTACTOS: {
      WHATSAPP: '961 505 576',
      TELEFONO: '(01) 204 0000 (Anexo 1)',
      EMAIL: 'cursosdearte@mali.pe',
      EMAIL_VIRTUAL: 'cursosvirtuales@mali.pe',
      SOPORTE_VIRTUAL: '946 216 569'
    }
  };

  const MAPS_API_KEY = 'AIzaSyBkVP5u46KYPE3hI1nb0w0G7aBnpyOy07I';
  function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  document.addEventListener('DOMContentLoaded', loadGoogleMaps);