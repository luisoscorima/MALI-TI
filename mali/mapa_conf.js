// Este archivo contiene la configuración de los enlaces y contactos para la página de contacto del MALI.
  const URLS = {
    BROCHURES: {
      PRINCIPAL: 'https://drive.google.com/file/d/1EBjwy5tHEZfuroli-e0EubN5eVIEAvH9/view?usp=sharing',
      LA_MOLINA: 'https://drive.google.com/file/d/1HrI5udhX9UD7yk1ohBPEaOeUyEb30Qjx/view?usp=sharing',
      SAN_MIGUEL: 'https://drive.google.com/file/d/126G2zJSMaAg5--z9vnUoL4XWxHU48jtU/view?usp=sharing',
      CHORRILLOS: 'https://drive.google.com/file/d/1uDUGpC78k9lh0q6gdCDZSqWIEl0GniKe/view?usp=sharing',
      LOS_OLIVOS: 'https://drive.google.com/file/d/1CQ8xPi89ouQy-onLAVzMFnPUar3z82_W/view?usp=sharing',
      SJL: 'https://drive.google.com/file/d/15qYVLjleAI3h_OYauyGlt-HUlMMXbvJJ/view?usp=sharing',
      PUEBLO_LIBRE: 'https://drive.google.com/file/d/139KbCvqhZDOfE5MX_NYP4fNpX3RAtZW3/view?usp=sharing',
      VIRTUAL: 'https://drive.google.com/file/d/1ZF0pwx17aua0I_O0SPD-5yM1mNIhAXOd/view?usp=sharing',
      BELLAVISTA: 'https://drive.google.com/file/d/1id4CMFX_TSsTA8D3wa78eElgpzjTP45l/view?usp=sharing'
    },
    IMAGES: {
      RECTANGULO: 'https://mali-assets.s3.us-east-1.amazonaws.com/assets-educacion/Rectangulo.png',
      WHATSAPP: 'https://mali-assets.s3.us-east-1.amazonaws.com/assets-educacion/WhatsApp.png',
      CORREO: 'https://mali-assets.s3.us-east-1.amazonaws.com/assets-educacion/correo.png',
    },
    CONTACTOS: {
      WHATSAPP: '961 505 576',
      TELEFONO: '(01) 204 0000 (Anexo 1)',
      EMAIL: 'cursosdearte@mali.pe',
      EMAIL_VIRTUAL: 'cursosvirtuales@mali.pe',
      SOPORTE_VIRTUAL: '946 216 569'
    }
  };

  // Configuración de sedes MALI
  const CONFIG = {
    sedes: [
      {
        id: 'principal',
        nombre: 'MALI Principal',
        url: URLS.BROCHURES.PRINCIPAL
      },
      {
        id: 'la-molina',
        nombre: 'MALI La Molina',
        url: URLS.BROCHURES.LA_MOLINA
      },
      {
        id: 'san-miguel',
        nombre: 'MALI San Miguel',
        url: URLS.BROCHURES.SAN_MIGUEL
      },
      {
        id: 'chorrillos',
        nombre: 'MALI Chorrillos',
        url: URLS.BROCHURES.CHORRILLOS
      },
      {
        id: 'los-olivos',
        nombre: 'MALI Los Olivos',
        url: URLS.BROCHURES.LOS_OLIVOS
      },
      {
        id: 'sjl',
        nombre: 'MALI San Juan de Lurigancho',
        url: URLS.BROCHURES.SJL
      },
      {
        id: 'pueblo-libre',
        nombre: 'MALI Pueblo Libre',
        url: URLS.BROCHURES.PUEBLO_LIBRE
      },
      {
        id: 'bellavista',
        nombre: 'MALI Bellavista',
        url: URLS.BROCHURES.BELLAVISTA
      },
      {
        id: 'virtual',
        nombre: 'MALI Virtual',
        url: URLS.BROCHURES.VIRTUAL
      }
    ]
  };
