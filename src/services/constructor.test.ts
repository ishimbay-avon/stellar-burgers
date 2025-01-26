import { expect, test, describe } from '@jest/globals';
import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  reorderConstructor
} from './constructorSlice';

const ingredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const ingredientsBeforeReordered = [
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0
  }
];

const ingredientsAfterReordered = [
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

describe('тесты синхронных экшенов', () => {
  // начальное состояние, которое будем менять в тестах
  const initialConstructorState = {
    bun: null,
    ingredients: []
  };

  test('добавление ингредиента', () => {
    const newState = constructorSliceReducer(
      initialConstructorState,
      addIngredient(ingredient)
    );
    // достаем массив ингредиентов из состояния
    const { ingredients } = newState;

    // Проверяем, что в массиве теперь один элемент
    expect(ingredients.length).toBe(1);

    // Проверяем, что добавленный ингредиент совпадает с ожидаемым
    const addedIngredient = ingredients[0];
    expect(addedIngredient._id).toBe(ingredient._id);
    expect(addedIngredient.name).toBe(ingredient.name);
    expect(addedIngredient.type).toBe(ingredient.type);
    expect(addedIngredient.proteins).toBe(ingredient.proteins);
    expect(addedIngredient.fat).toBe(ingredient.fat);
    expect(addedIngredient.carbohydrates).toBe(ingredient.carbohydrates);
    expect(addedIngredient.calories).toBe(ingredient.calories);
    expect(addedIngredient.price).toBe(ingredient.price);
    expect(addedIngredient.image).toBe(ingredient.image);
    expect(addedIngredient.image_mobile).toBe(ingredient.image_mobile);
    expect(addedIngredient.image_large).toBe(ingredient.image_large);
    // сравниваем то что получилось с ожидаемым результатом
    //expect(ingredients).toEqual([ingredient]);
    // expect(newState.ingredients[0]).toEqual({
    //   ...ingredient1,
    //   id: expect.any(String)
    // });
  });

  test('удаление ингредиента', () => {
    const newState = constructorSliceReducer(
      initialConstructorState,
      removeIngredient(ingredient)
    );
    // достаем массив ингредиентов из состояния
    const { ingredients } = newState;

    // Проверяем, что в массиве теперь ноль элементов
    expect(ingredients.length).toBe(0);

    // Проверяем, что стейт в начальном состоянии
    expect(newState).toEqual(initialConstructorState);
  });

  test('изменение порядка ингредиентов в начинке', () => {
    const newState = constructorSliceReducer(
      {
        bun: null,
        ingredients: ingredientsBeforeReordered
      },
      reorderConstructor({ from: 0, to: 1 })
    );
    // достаем массив ингредиентов из состояния
    const { ingredients } = newState;

    // Проверяем, что стейт в начальном состоянии
    expect(ingredients).toEqual(ingredientsAfterReordered);
  });
});
