import { expect, test, describe } from '@jest/globals';

import userReducer, { initialState } from './userSlice';

const userResponse = {
  success: true,
  user: { email: 'nail_nasyrov@mail.ru', name: 'Наиль' }
};

describe('тест userReducer', () => {
  test('Регистрация пользователя', () => {
    expect(
      userReducer(initialState, {
        type: 'user/registerUserThunk/pending'
      })
    ).toEqual({
      ...initialState,
      requestStatus: true
    });
  });

  test('Регистрация выполнена', () => {
    expect(
      userReducer(initialState, {
        type: 'user/registerUserThunk/fulfilled',
        payload: userResponse
      })
    ).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true
    });
  });

  test('Ошибка при регистрации', () => {
    const errorMessage = 'Ошибка при регистрации пользователя.';
    expect(
      userReducer(initialState, {
        type: 'user/registerUserThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loginUserError: errorMessage,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  //-----------------------------------------------------------------

  test('Авторизация пользователя', () => {
    expect(
      userReducer(initialState, {
        type: 'user/loginUserThunk/pending'
      })
    ).toEqual({
      ...initialState,
      requestStatus: true,
      loginUserError: null
    });
  });

  test('Авторизация выполнена', () => {
    expect(
      userReducer(initialState, {
        type: 'user/loginUserThunk/fulfilled',
        payload: userResponse
      })
    ).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  test('Ошибка при авторизации', () => {
    const errorMessage = 'Ошибка при авторизации пользователя.';
    expect(
      userReducer(initialState, {
        type: 'user/loginUserThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loginUserError: errorMessage,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  //-----------------------------------------------------------------

  test('Получить данные пользователя', () => {
    expect(
      userReducer(initialState, {
        type: 'user/getUserThunk/pending'
      })
    ).toEqual({
      ...initialState,
      requestStatus: true
    });
  });

  test('Данные получены', () => {
    expect(
      userReducer(initialState, {
        type: 'user/getUserThunk/fulfilled',
        payload: userResponse
      })
    ).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true
    });
  });

  test('Ошибка получения данных', () => {
    const errorMessage = 'Ошибка при получении данных пользователя.';
    expect(
      userReducer(initialState, {
        type: 'user/getUserThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loginUserError: errorMessage,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  //-------------------------------------------------------------------------

  const updatedUser = {
    success: true,
    user: { email: 'nail_nasyrov@mail.ru', name: 'Наиль Насыров' }
  };

  test('Обновить данные пользователя', () => {
    expect(
      userReducer(initialState, {
        type: 'user/updateUserThunk/pending'
      })
    ).toEqual({
      ...initialState,
      requestStatus: true,
      loginUserError: null
    });
  });

  test('Данные обновлены', () => {
    expect(
      userReducer(initialState, {
        type: 'user/updateUserThunk/fulfilled',
        payload: updatedUser
      })
    ).toEqual({
      ...initialState,
      user: updatedUser.user,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  test('Ошибка обновления данных', () => {
    const errorMessage = 'Ошибка при обновлении данных пользователя.';
    expect(
      userReducer(initialState, {
        type: 'user/updateUserThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loginUserError: errorMessage,
      isAuthChecked: true,
      requestStatus: false
    });
  });

  test('Выход из системы', () => {
    expect(
      userReducer(initialState, {
        type: 'user/logoutThunk/pending'
      })
    ).toEqual({
      ...initialState,
      requestStatus: true
    });
  });

  test('Выход выполнен успешно', () => {
    expect(
      userReducer(initialState, {
        type: 'user/logoutThunk/fulfilled'
      })
    ).toEqual({
      ...initialState,
      user: null
    });
  });

  test('Ошибка при выходе из системы', () => {
    const errorMessage = 'Ошибка при выходе из системы.';
    expect(
      userReducer(initialState, {
        type: 'user/logoutThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loginUserError: errorMessage,
      requestStatus: false
    });
  });
});
