describe('Реєстрація користувача', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/register');
  });

  it('Реєстрація з валідними даними', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: { id: 1, email: 'newuser@example.com' }
    }).as('mockRegister');

    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('newpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@mockRegister');
    cy.log('✅ Реєстрація виконана ');
  });

  it('Помилка при існуючому email', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 409,
      body: { message: 'Користувач уже існує' }
    }).as('mockRegisterFail');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@mockRegisterFail');
    cy.log('⚠️ Відображено помилку існуючого користувача');
  });
});
