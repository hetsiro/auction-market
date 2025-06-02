import { configureStore } from '@reduxjs/toolkit';

import appReducer from './app/AppSlice';
import authReducer from './auth/AuthSlice';
import cartReducer from './cart/CartSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
