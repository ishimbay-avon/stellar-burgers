import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { getOrdersThunk, selectOrders } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(selectOrders) || [];

  return <ProfileOrdersUI orders={orders} />;
};
