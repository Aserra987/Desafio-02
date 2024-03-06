/// <reference types="cypress" />
import { homePage } from "../pages/home";
import { productsPage } from "../pages/products" 
import { productActions } from "../actions/products"; 

describe('Desafio-02', () => {
  
  before(() => {
    // Login on Pushing It
    cy.login(Cypress.env().username, Cypress.env().password);
    cy.visit('');
  })

  it('Desafio-02', () => {
    cy.fixture('products').then(data => {
       
      // Search product and delete if it exists
      cy.getProduct({productId: data.product.id})
        .its('body.products.docs').each((product) => {
          cy.deleteProduct({ _id: product._id});
      });

      cy.createProduct({body: data.product});
      cy.editProduct({id: data.product.id, body: data.updatedProduct});

      cy.getElementByDataCy({dataCy: homePage.elements.dataCys.onlineshoplink}).click();
      
      productActions.searchProduct({id: data.product.id});

      // Verify search result
      cy.get(productsPage.elements.selectors.productImage)
      .should('have.length', 1)
      .should('be.visible')
      .invoke('attr', 'src')
      .should('eq', data.updatedProduct.img);
      cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.productNameLabel}).should('contains.text', data.updatedProduct.name);
      cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.productPriceLabel}).should('contains.text', data.updatedProduct.price);
    });
  })
})
