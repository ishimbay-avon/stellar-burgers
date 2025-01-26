import { rootReducer } from './store';
import { expect, describe, test } from '@jest/globals';
import { initialState as ingredients } from './ingredientSlice';
import { initialState as constructorSlice } from './constructorSlice';
import { initialState as feed } from './feedSlice';
import { initialState as user } from './userSlice';
import { initialState as order } from './orderSlice';

describe('rootReducer', () => {
  test('Должен правильно инициализироваться и возвращать исходное состояние', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients,
      constructorSlice,
      user,
      feed,
      order
    });
  });
});
