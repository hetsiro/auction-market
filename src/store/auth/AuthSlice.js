import { createSlice } from '@reduxjs/toolkit';

import { STATUS } from '../../constants/status';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: localStorage.getItem('status') || STATUS.CHECKING, // success | checking | error | idle || init
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.status = STATUS.IDLE;
    },
    setAuthStatus: (state, { payload }) => {
      state.status = payload;
    },
    setAuthError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { authLogin, authLogout, setAuthStatus, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
