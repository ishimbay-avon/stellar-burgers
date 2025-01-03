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

const initialState: IFeedState = {
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
      })
      .addCase(fetchFeeds.rejected, (state, payload) => {
        state.error = payload.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectIFeedStates: (sliceState: IFeedState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading
  }
});

//экспортируем функции редьюсеры
export const { selectIFeedStates, selectIsLoading } = feedSlice.selectors;
export const { clearOrders } = feedSlice.actions;
export default feedSlice.reducer;
