import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    productList: productReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
