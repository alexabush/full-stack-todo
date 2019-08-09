import { cyan } from '@material-ui/core/colors';

describe('Loads Cyprus', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true);
  });
});

describe('Todo functionality works', function() {
  beforeEach(function() {
    //   // reset and seed the database prior to every test
    cy.request('http://localhost:3000/messages/seed-db');
    cy.visit('http://localhost:3000/');
  });
  it('exists', () => {});
  it('adds item', function() {
    cy.get('input').type('hi mom!');
    cy.contains('Submit').click();
    cy.get('ul')
      .find('li')
      .its('length');
  });
  it('deletes item', function() {
    cy.get('.delete-icon')
      .last()
      .click();
    cy.get('ul')
      .find('li')
      .its('length');
    //   .should('be.lte', 8);
  });
  it('updates item', function() {
    cy.get('li')
      .contains('hi mom!')
      .last()
      .click();
    cy.get('input')
      .first()
      .click()
      .clear()
      .type('see you soon!');
    cy.contains('Update').click();
  });
});
