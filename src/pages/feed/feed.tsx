import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { clearOrders, fetchFeeds } from '../../services/feedSlice';
export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  function updateOrders() {
    dispatch(clearOrders());
    dispatch(fetchFeeds());
  }

  return <FeedUI orders={orders} handleGetFeeds={updateOrders} />;
};
