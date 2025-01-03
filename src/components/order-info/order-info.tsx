import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getOrderByNumberThunk } from '../../services/orderSlice';
//import {selectIngredients} from '../../services/ingredientSlice';
//import { useSelector } from 'react-redux';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  //  const ingredients: TIngredient[] = [];
  const ingredients = useSelector((state) => state.ingredients.data);
  console.log('ingredients', ingredients);
  /** TODO: взять переменные orderData и ingredients из стора */
  // const orderData = {
  //   createdAt: '',
  //   ingredients: [],
  //   _id: '',
  //   status: '',
  //   name: '',
  //   updatedAt: 'string',
  //   number: 0
  // };

  const { number } = useParams();

  let orderData = useSelector((state) =>
    state.feed.orders.find((item) => item.number === Number(number))
  );
  console.log('feed', orderData);
  if (!orderData) {
    orderData = useSelector((state) =>
      state.order.orders?.find((item) => item.number === Number(number))
    );
    console.log('order', orderData);
  }
  if (!orderData) {
    const orderByNumber = useSelector((state) => state.order.orderByNumber);
    if (orderByNumber?.number === Number(number)) {
      orderData = orderByNumber;
    }
    console.log('orderByNumber', orderData);
  }

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
