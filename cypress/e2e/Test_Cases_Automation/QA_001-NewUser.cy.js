Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

import 'cypress-file-upload'
import accesPage from '../../fixtures/Acces/pageAcess'

const accesDubai = new accesPage
const nombreAleatorio = generarNombre(8);
const nameUser = generarNombre(10);
const phoneUser = generarCodigo(10)
const password = 'Simulador98@';


describe('QA_001 Registro de Usuario Nuevo', () => {
  
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // Acceder a la URL de Dubai Store
  it('Step 1', () => {
    accesDubai.accesDubai()
  })

  //Ingresar a la opción New User, para registrar un nuevo usuario
  it('Step 2', () => {
    cy.get('a[href="/customer/register"]').should('be.visible').click()
    cy.wait(4000)
    accesDubai.closePopUp()
  });

  //Ingresar email, contraseña y confirmación de contraseña
  it('Step 3', () => {
    //Estas funciones han sido desarrolladas para generar nombres, apellidos y números aleatorios únicos, garantizando que no se repita la misma información.
    cy.get('input[type="email"]').should('be.visible').type(nombreAleatorio + ' @yopmail.com')
    cy.get('input[name="password"]').should('be.visible').type(password)
    cy.get('input[name="passwordConfirm"]').should('be.visible').type(password)
  });

  //Ingresamos nombre, apellido, telefono y seleccionamos la opción registrar
  it('Step 4', () => {
    //Estas funciones han sido desarrolladas para generar nombres, apellidos y números aleatorios únicos, garantizando que no se repita la misma información.
    cy.get('input[id="customer.firstName"]').should('be.visible').type(nameUser + 'ton')
    cy.get('input[id="lastName"]').should('be.visible').type(nameUser + 'ton')
    cy.get('input[id="customer.mobileNumber"]').should('be.visible').type(phoneUser)
    cy.wait(3000)
    cy.get('input[id="newsLetterSubscription1"]').should('be.checked')
    cy.get('button').contains('Register').should('be.visible').click()
    cy.wait(10000)
  });

  //Cerramos la sesión
  it('Step 5', () => {
    accesDubai.logOut()
  });

})

function generarCodigo(length) {
  const caracteres = '01234567891020320147';
  let codigo = '';

  for (let i = 0; i < length; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indice);
  }

  return codigo;
}

function generarNombre(length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let nombre = '';

  for (let i = 0; i < length; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    nombre += caracteres.charAt(indice);
  }

  return nombre;
}