import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

export const initialState: IConstructorItems = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        //если это булка, то она должна быть одна
        //сохраним в bun
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          //иначе это какой-то ингридиент, добавим в массив
          const newList = [...state.ingredients, action.payload];
          state.ingredients = newList;
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item, index) => index !== action.payload
      );
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    constructorState: (sliceState: IConstructorItems) => sliceState
  }
});

//экспортируем функции редьюсеры
export const { constructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  reorderConstructor,
  clearConstructor
} = constructorSlice.actions;
