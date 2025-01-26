import { expect, test, describe } from '@jest/globals';

import feedReducer, { initialState } from './feedSlice';

const feedArray = [
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
  },
  {
    _id: '6792cc77133acd001be4c5ea',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2025-01-23T23:10:47.968Z',
    updatedAt: '2025-01-23T23:10:48.928Z',
    number: 66667
  },
  {
    _id: '6792cc54133acd001be4c5e8',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-01-23T23:10:12.716Z',
    updatedAt: '2025-01-23T23:10:13.307Z',
    number: 66666
  }
];

describe('тест feedReducer', () => {
  test('Процесс загрузки', () => {
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/pending'
      })
    ).toEqual({
      orders: [],
      isLoading: true,
      error: null,
      total: 0,
      totalToday: 0
    });
  });

  const feedResponse = {
    orders: feedArray,
    total: 4,
    totalToday: 4
  };

  test('Данные загружены', () => {
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/fulfilled',
        payload: feedResponse
      })
    ).toEqual({
      orders: feedArray,
      isLoading: false,
      error: null,
      total: 4,
      totalToday: 4
    });
  });

  test('Ошибка при загрузке ингредиентов', () => {
    const errorMessage = 'Не удалось загрузить заказы';
    expect(
      feedReducer(initialState, {
        type: 'feed/fetchFeeds/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      orders: [],
      isLoading: false,
      error: errorMessage,
      total: 0,
      totalToday: 0
    });
  });
});
