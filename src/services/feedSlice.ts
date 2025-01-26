import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '@api';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const feeds = await getFeedsApi();
  return feeds;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, payload) => {
        state.error = payload.error.message;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectFeedOrders: (sliceState: IFeedState) => sliceState.orders,
    selectFeedIsLoading: (sliceState) => sliceState.isLoading,
    selectFeedTotal: (sliceState: IFeedState) => sliceState.total,
    selectFeedTotalToday: (sliceState: IFeedState) => sliceState.totalToday
  }
});

//экспортируем функции редьюсеры
export const {
  selectFeedOrders,
  selectFeedIsLoading,
  selectFeedTotal,
  selectFeedTotalToday
} = feedSlice.selectors;
export const { clearOrders } = feedSlice.actions;
export default feedSlice.reducer;
