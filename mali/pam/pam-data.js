/**
 * Fuente única de datos — Programa Amigos del MALI (PAM)
 * Editar precios, beneficios y links de checkout aquí.
 */
(function (global) {
  'use strict';

  global.PAM_DATA = {
    benefits: [
      'Acceso gratuito a exposiciones',
      'Invitación a inauguraciones de exposiciones',
      'Acceso gratuito a Noche MALI',
      'Invitación para visitas guiadas especiales',
      'Visita guiada por el mes de tu cumpleaños*',
      'Descuento en actividades especiales',
      'Acceso al carnet de biblioteca**',
      '15% de descuento en cursos y talleres, y 20% en e. profesional***',
      'Descuento en productos y publicaciones MALI',
      'Beneficios por participación en actividades de fin de semana***',
      '10% de descuento en consumos en el restaurante del MALI'
    ],

    notes: [
      '* Acceso a salón prado previa coordinación.',
      '** Incluye integración en el Club de lectura MALI.',
      '*** +1 Noche MALI, por completar Tarjeta de Actividades PAM con los 4 sellos.',
      'El tiempo mínimo de permanencia es de un (1) año.'
    ],

    plans: [
      {
        id: 'amigo',
        name: 'Amigo',
        color: 'green',
        exclusive: false,
        monthly: {
          price: '19.90',
          duration: 'mes',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a624901905bc2b30d00b9',
          values: ['Titular', 'Titular', '+2', 'Titular', '+5', '10%', '×', '✓', '5%', '✓', '✓']
        },
        yearly: {
          price: '220',
          duration: 'año',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a61d301905bcc15a100c0',
          values: ['Titular', 'Titular', '+2', 'Titular', '+5', '10%', '×', '✓', '5%', '✓', '✓']
        }
      },
      {
        id: 'comunidad',
        name: 'Comunidad',
        color: 'pink',
        exclusive: true,
        monthly: {
          price: '39.90',
          duration: 'mes',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a61d301905bc47b7600b3',
          values: ['1', 'Doble', '+3', '+2', '+7', '15%', '×', '✓', '10%', '✓', '✓']
        },
        yearly: {
          price: '440',
          duration: 'año',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a61d301905bd5666e00c9',
          values: ['1', 'Doble', '+3', '+2', '+7', '15%', '×', '✓', '10%', '✓', '✓']
        }
      },
      {
        id: 'circulo',
        name: 'Círculo',
        color: 'blue',
        exclusive: false,
        monthly: {
          price: '99.90',
          duration: 'mes',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a61d301905bc8d8c000bb',
          values: ['3', 'Doble', '+5', '+3', '+10', '20%', '✓', '✓', '15%', '✓', '✓']
        },
        yearly: {
          price: '1,100',
          duration: 'año',
          checkout: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c938084905a61e001905bda518d00bd',
          values: ['3', 'Doble', '+5', '+3', '+10', '20%', '✓', '✓', '15%', '✓', '✓']
        }
      }
    ]
  };
})(typeof window !== 'undefined' ? window : this);
