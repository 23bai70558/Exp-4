import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer
  },
  // Redux DevTools is enabled by default in development
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
