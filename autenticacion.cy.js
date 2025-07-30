describe('Ingreso al aplicativo y busqueda de embarques existentes e inexistentes', () => {
  let datos = {};

  before(() => {
    cy.fixture('codigos').then((data) => {
      datos = data;
    });
  });

  function generarPinIncorrecto(pinCorrecto) {
    let pin;
    do {
      pin = Math.floor(1000 + Math.random() * 9000).toString();
    } while (pin === pinCorrecto);
    return pin;
  }

  beforeEach(() => {
    cy.visit('https://www.selaski.com/public/reports/shared?token=5b8140da2164226f7d1ab0626547985903b');
    cy.wait(1000);
    cy.get('#digit1', { timeout: 10000 }).should('be.visible');
  });

  it('Validacion de ingreso fallida por pin incorrecto', () => {
    const pinIncorrecto = generarPinIncorrecto(datos.pinValido);
    cy.log('Se genera un pin incorrecto de forma aleatoria: ' + pinIncorrecto);

    cy.get('#digit1').type(pinIncorrecto[0]);
    cy.get('#digit2').type(pinIncorrecto[1]);
    cy.get('#digit3').type(pinIncorrecto[2]);
    cy.get('#digit4').type(pinIncorrecto[3]);

    cy.contains('Ingresar').click();
    cy.wait(1000);
    cy.contains('Código incorrecto. Por favor ingresa el código correcto para tener acceso', { timeout: 10000 })
      .should('be.visible');

    //Validación de ingreso por pin correcto traido desde codigos.json
    cy.get('#digit1').clear().type(datos.pinValido[0]);
    cy.get('#digit2').clear().type(datos.pinValido[1]);
    cy.get('#digit3').clear().type(datos.pinValido[2]);
    cy.get('#digit4').clear().type(datos.pinValido[3]);
    cy.contains('Ingresar').click();

    cy.wait(1000);
    cy.contains('Filtros', { timeout: 10000 }).should('exist');

    // En el filtro maestro seleccionar embarque
    cy.contains('Filtros').click();
    cy.wait(800);
    cy.contains('Seleccionar').click();
    cy.get('.search-options', { timeout: 5000 }).should('be.visible');
    cy.wait(1000);
    cy.get('.search-options').contains('Embarque').click({ force: true });
    cy.wait(1000);

    // Se ingresa el embarque "Prueba 1"
    cy.get('input[placeholder="Escribe aquí tu búsqueda"]', { timeout: 8000 })
      .should('not.be.disabled')
      .clear()
      .type('Prueba 1{enter}');
    cy.wait(5000);

    // Eliminacion de filtro
    cy.get('object[data="/assets/svg/remove.svg"]', { timeout: 8000 })
      .should('be.visible')
      .click({ force: true });
    cy.wait(5000);

    // Busqueda de embarque no existente
    cy.get('input[placeholder="Escribe aquí tu búsqueda"]', { timeout: 8000 })
      .should('not.be.disabled')
      .clear()
      .type('Prueba 2{enter}');
    cy.wait(4000);

    cy.contains('Sin datos para mostrar', { timeout: 10000 }).should('be.visible');

    // Mensaje de automatizacion finalizada
  cy.window().then((win) => {
  const mensaje = win.document.createElement('div');
  mensaje.innerText = '✅ Prueba finalizada';
  Object.assign(mensaje.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 30px',
    backgroundColor: '#38bdf8',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    zIndex: 9999,
    textAlign: 'center'
  });
  win.document.body.appendChild(mensaje);
    });
  });
});
