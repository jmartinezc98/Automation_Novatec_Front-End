Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

import 'cypress-file-upload'
import accesPage from '../../fixtures/Acces/pageAcess'

const accesDubai = new accesPage
let userName = 'probador1@yopmail.com'
let userPassword = 'Probador1@'
let name = 'Anthony'
let lastName = 'Hopkins'
let articuloSeleccionado = ''
let articulo = ''
let articuloComparar = ''
let articuloCompara = ''


describe('QA_002 Login usuario', () => {

  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // Acceder a la URL de Dubai Store
  it('Step 1', () => {
    accesDubai.accesDubai()
  })

  //Ingresar a la opción Login 
  it('Step 2', () => {
    cy.get('a[href="/login"]').should('be.visible').click()
    cy.wait(3000)
    cy.get('#login').should('be.visible')
    // cy.get('span').should(el => {
    //   expect(el).to.have.length(3);
    //   expect(el.eq(0).text().trim()).to.contain("");
    //   expect(el.eq(1).text().trim()).to.contain('');
    //   expect(el.eq(2).text().trim()).to.contain('');
    // })
    cy.get('span[class="inner-sub"]').should('contain.text', 'Welcome back')
    cy.get('span[class="main-login-title"]').should('contain.text', 'Sign in to your account')
    cy.wait(2000)

  });

  //Diligenciamos los campos con un usuario ya creado
  it('Step 3', () => {
    cy.get('input[id="username"]').should('be.visible').type(userName)
    cy.get('input[id="password"]').should('be.visible').type(userPassword)
    cy.wait(1000)
    cy.get('button').contains('Sign in').should('be.visible').click().wait(3000)
  });

  //Seleeccionamos algún articulo para añadirlo al carrito
  it('Step 4', () => {
    cy.get('div[id="countrySelectionContent"]').then($popup => {
      if ($popup.length > 0) {
        cy.get('button[class="close"]').should('be.visible').eq(0).click().wait(3000);

      } else {
        cy.get('div[class="top-bar"]').click();
      }
    });

    cy.get('div[class="js-image image card-image list-card-image"]').eq(3).click().wait(6000)

  });

  //Validamos el articulo que seleccionamos y lo agregamos al carrito
  it('Step 5', () => {
    cy.get('div[id="countrySelectionContent"]').then($popup => {
      if ($popup.length > 0) {
        cy.get('button[class="close"]').should('be.visible').eq(0).click().wait(3000);

      } else {
        cy.get('div[class="top-bar"]').click();
      }
    });

    cy.get('h3[class="product-name"]').then(e => {
      expect(e.val()).not.null
      articuloSeleccionado = e.val()
      console.log('val', e.val())
    })
    // articuloSeleccionado = document.getElementById('h3[class="product-name"]')
    // articulo = articuloSeleccionado.textContent.trim()
    cy.get('button[data-add-to-cart-text="Add to Cart"]').click().wait(2000)
  });

  //Ingresamos al carrito de compras
  it('Step 6', () => {

    cy.get('a[class="btn btn-primary goto-full-cart btn-view-cart btn-instant-checkout"]').eq(0).click().wait(2000)

    cy.get('a[class="shari-product-name"]').then(e => {
      expect(e.val()).not.null
      articuloCompara = e.val()
      console.log('val', e.val())
    })

    // articuloComparar = document.getElementById('font[style="vertical-align: inherit;"]')
    // articuloCompara = articuloComparar.textContent.trim()
  });


  //Comparamos que el articulo seleccionado inicialmente es el mismo que hay en el carrito de compras
  it('Step 7', () => {
    if (articuloSeleccionado === articuloCompara) {
      console.log('Coincide con el artículo seleccionado para la compra.');
    } else {
      console.log('No Coincide con el artículo seleccionado para la compra.');
    }
  });

  // Finalizamos la sesión
  it('Step 8', () => {
    accesDubai.logOut()
  });

})
