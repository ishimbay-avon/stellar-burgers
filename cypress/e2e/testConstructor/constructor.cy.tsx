/// <reference types="cypress" />

describe('проверяем доступность приложения', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });

  it('Добавление булки', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('ingredient1 (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('ingredient1 (низ)')
      .should('exist');
  });

  it('Добавление ингредиентов', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('ingredient2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('ingredient4')
      .should('exist');
  });
});

describe('Проверка модального окна ингредиента', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открытие модальнго окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('ingredient1').should('exist');
  });

  it('Закрытие модальнго окна кликом на крестик', function () {
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-icon]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие по клику на оверлей', function () {
    cy.contains('ingredient1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Добавление ингредиентов и создание заказа', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order-summ]')
      .contains('Оформить заказ')
      .should('exist')
      .click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '4', '1'] });

    cy.get('[data-cy=order-number]').contains('66671').should('exist');

    cy.get('[data-cy=close-icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').should('not.exist');
  });
});
