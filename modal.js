document.addEventListener('DOMContentLoaded', iniciarModalSucursales);

export function iniciarModalSucursales() {
  const modal = document.getElementById('modal1');
  if (!modal) return;

  const tituloModal = modal.querySelector('.modal-title');
  const cuerpoModal = modal.querySelector('.modal-body');

  const sucursalesPanaderia = {
    centro: {
      nombre: 'Sucursal Centro',
      descripcion: 'Aventúrate y conoce más de lo que ofrecemos en la sucursal centro, nos ubicamos en calle los Jirón 356, La Victoria',
      mapa: 'https://www.google.com/maps/place/Calle+los+Jir%C3%B3n+356+La+Victoria'
    },
    norte: {
      nombre: 'Sucursal Norte',
      descripcion: 'Aventúrate y conoce más de lo que ofrecemos en la sucursal norte, nos ubicamos en el Próceres Huandoy 2675, Los Olivos',
      mapa: 'https://www.google.com/maps/place/Proceres+Huandoy+2675+Los+Olivos'
    },
    sur: {
      nombre: 'Sucursal Sur',
      descripcion: 'Aventúrate y conoce más de lo que ofrecemos en la sucursal sur, nos ubicamos en calle los Gorriones 279, Chorrillos',
      mapa: 'https://www.google.com/maps/place/Calle+los+Gorriones+279+Chorrillos'
    },
    este: {
      nombre: 'Sucursal Este',
      descripcion: 'Aventúrate y conoce más de lo que ofrecemos en la sucursal este, nos ubicamos en calle los Malotes 456, Callao',
      mapa: 'https://www.google.com/maps/place/Calle+los+Malotes+456+Callao'
    }
  };

  // Escuchar clics en los botones que abren el modal
  document.querySelectorAll('[data-bs-target="#modal1"]').forEach(button => {
    button.addEventListener('click', function() {
      const sede = this.getAttribute('data-sede');
      const sucursal = sucursalesPanaderia[sede];
      
      if (sucursal) {
        tituloModal.textContent = sucursal.nombre;
        cuerpoModal.innerHTML = `
          <p>${sucursal.descripcion}</p>
          <a href="${sucursal.mapa}" target="_blank" class="btn btn-primary">Ver en mapa</a>
        `;
      }
    });
  });

  // También puedes actualizar el botón "Ver ubicación" en el footer del modal
  modal.querySelector('.modal-footer .btn-secondary').addEventListener('click', function() {
    const activeSede = modal.getAttribute('data-active-sede');
    if (activeSede && sucursalesPanaderia[activeSede]) {
      window.open(sucursalesPanaderia[activeSede].mapa, '_blank');
    }
  });
}