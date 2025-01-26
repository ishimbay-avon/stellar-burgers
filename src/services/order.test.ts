import { expect, test, describe } from '@jest/globals';

import orderReducer, { initialState } from './orderSlice';

const orderArray = [
  {
    _id: '67930457133acd001be4c615',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-01-24T03:09:11.718Z',
    updatedAt: '2025-01-24T03:09:12.348Z',
    number: 66669
  },
  {
    _id: '67930448133acd001be4c613',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-01-24T03:08:56.685Z',
    updatedAt: '2025-01-24T03:08:57.396Z',
    number: 66668
  }
];

const orderResponse = {
  success: true,
  name: 'Флюоресцентный метеоритный бургер',
  order: { number: 66671 }
};

describe('тест orderReducer', () => {
  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: true
    });
  });

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/fulfilled',
        payload: orderResponse
      })
    ).toEqual({
      ...initialState,
      orderModalData: orderResponse.order,
      name: orderResponse.name,
      isLoading: false,
      orderRequest: false
    });
  });

  test('Ошибка при загрузке ингредиентов', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/orderBurgerThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false,
      orderRequest: false
    });
  });

  //----------------------------------------------------------------------

  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: true,
      error: null
    });
  });

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/fulfilled',
        payload: orderArray
      })
    ).toEqual({
      ...initialState,
      orders: orderArray,
      isLoading: false,
      error: null
    });
  });

  test('Ошибка при загрузке ингредиентов', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/getOrdersThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });

  //----------------------------------------------------------------------

  test('Процесс загрузки', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/pending'
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  const orderByNumberResponse = {
    success: true,
    orders: [orderArray[0]]
  };

  test('Данные загружены', () => {
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/fulfilled',
        payload: orderByNumberResponse
      })
    ).toEqual({
      ...initialState,
      orderByNumber: orderArray[0],
      isLoading: false
    });
  });

  test('Ошибка при загрузке ингредиентов', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      orderReducer(initialState, {
        type: 'order/getOrderByNumberThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      orderByNumberError: errorMessage
    });
  });
});
