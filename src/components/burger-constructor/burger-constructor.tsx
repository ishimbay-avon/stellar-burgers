import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import {
  clearOrders,
  orderBurgerThunk,
  selectOrderModalDataState,
  selectOrderRequestState
} from '../../services/orderSlice';
import {
  clearConstructor,
  constructorState
} from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector(constructorState);

  // const constructorItems = {
  //   bun: {
  //     price: bun?.price
  //   },
  //   ingredients: ingredients
  // };

  const orderRequest = useSelector(selectOrderRequestState);

  const orderModalData = useSelector(selectOrderModalDataState);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const accessToken = getCookie('accessToken');

    if (accessToken) {
      const ingredientsIds = [
        constructorItems.bun?._id || '',
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun?._id || ''
      ];

      dispatch(orderBurgerThunk(ingredientsIds));
    } else {
      return navigate('/login', { state: { form: '/' } });
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrders());
    dispatch(clearConstructor());

    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
