import { productsPage } from "../pages/products";
export const productActions = {
    
    searchProduct({id, name}) {
        if (id) {
            cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.searchTypeList}).select('ID');
            cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.searchProductBar}).clear().type(id).type('{enter}')
        }
        if (name) {
            cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.searchTypeList}).select('name');
            cy.getElementByDataCy({dataCy: productsPage.elements.dataCys.searchProductBar}).clear().type(name).type('{enter}')
        }
    },
}
   