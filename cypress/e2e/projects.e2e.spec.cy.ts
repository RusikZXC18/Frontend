describe('Список проєктів', () => {
  beforeEach(() => {
    // 🔹 Перехоплюємо запит і підмінюємо відповідь
    cy.intercept('GET', 'http://localhost:3000/projects', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Mock Project', description: 'Desc 1' },
        { id: 2, name: 'Second Project', description: 'Desc 2' },
      ],
    }).as('mockProjects');

    cy.visit('http://localhost:4200/items');

    cy.wait('@mockProjects');
  });

  it('Відображає список із двох проєктів', () => {
    cy.get('body').should('contain', 'Mock Project');
    cy.get('body').should('contain', 'Second Project');
    cy.log('✅ Список проєктів відображено');
  });

  it('Фільтрація працює', () => {
    cy.get('input[type="text"]').type('Mock');
    cy.get('body').should('contain', 'Mock Project');
    cy.get('body').should('not.contain', 'Second Project');
    cy.log('🔍 Фільтрація працює');
  });
});
