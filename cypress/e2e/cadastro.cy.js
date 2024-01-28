const baseUrl = 'localhost:3000'

describe('Página de Cadastro', () => {
    it('Envio com e-mail inválido', () => {
      cy.visit('/'); 

      cy.get(':nth-child(1) > input').type('Gabriel')
      cy.get(':nth-child(2) > input').type('email.email.com')
      cy.get(':nth-child(3) > input').type('00000000000')
      cy.get(':nth-child(4) > input').type('111111111111')

      cy.get('span').should('have.text', 'Email inválido')
    
    });

    it('Envio com e-mail válidoe e exclusão do registro', () => {
      cy.visit('/'); 

      cy.get(':nth-child(1) > input').type('Gabriel')
      cy.get(':nth-child(2) > input').type('email@email.com')
      cy.get(':nth-child(3) > input').type('00000000000')
      cy.get(':nth-child(4) > input').type('111111111111')

      cy.get('span').should('have.text', 'Email válido')
      cy.get('.btn-cadastro').click();
      cy.url().should('eq', Cypress.config().baseUrl + 'meusDados')
      cy.wait(2000)
      cy.get('tr:first-child .btn-danger').click();   
      cy.get('tbody').should('contain', 'Nenhum Registro Encontrado');

    
    });
  });
