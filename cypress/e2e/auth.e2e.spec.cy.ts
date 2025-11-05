describe('Авторизація користувача', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Успішний вхід із правильними даними', () => {
    cy.intercept('POST', '**/users/login', {
      statusCode: 200,
      body: { token: 'fake-token', user: { email: 'test@example.com' } }
    }).as('mockLogin');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@mockLogin').its('response.statusCode').should('eq', 200);
  });

  it('Помилка при неправильному паролі', () => {
    cy.intercept('POST', '**/users/login', {
      statusCode: 401,
      body: { message: 'Невірний пароль' }
    }).as('mockLoginFail');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@mockLoginFail').its('response.statusCode').should('eq', 401);
  });
});
