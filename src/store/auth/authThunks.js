import { authLogin, setAuthStatus, setAuthError, authLogout } from './AuthSlice';
import {
  SweetAlertRecovery,
  SweetAlertRecoverySuccess,
} from '../../auth/components/Alerts';
import { API_URL } from '../../config';
import { STATUS } from '../../constants';

export const startLoginUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(setAuthStatus(STATUS.CHECKING));
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(setAuthError(data.message));
        dispatch(setAuthStatus(STATUS.ERROR));
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(authLogin(data));
      dispatch(setAuthStatus(STATUS.SUCCESS));
    } catch (err) {
      dispatch(setAuthError('Server offline'));
      dispatch(setAuthStatus(STATUS.ERROR));
      console.log(err.message);
    }
  };
};

export const startRegisterUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(setAuthStatus(STATUS.CHECKING));
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(setAuthError(data.message));
        dispatch(setAuthStatus(STATUS.ERROR));
        return;
      }

      await dispatch(startLoginUser(formData));
    } catch (err) {
      dispatch(setAuthError('Server offline'));
      dispatch(setAuthStatus(STATUS.ERROR));
      console.log(err.message);
    }
  };
};

export const startRecoveryPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(setAuthStatus(STATUS.CHECKING));
      const res = await fetch(`${API_URL}/api/auth/recovery-request`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      SweetAlertRecovery(data);
      dispatch(setAuthStatus(STATUS.IDLE));
    } catch (err) {
      dispatch(setAuthError('Server offline'));
      dispatch(setAuthStatus(STATUS.ERROR));
      console.log(err.message);
    }
  };
};

export const startResetPassword = ({ password, token }) => {
  return async (dispatch) => {
    try {
      dispatch(setAuthStatus(STATUS.CHECKING));
      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(setAuthError(data.message));
        dispatch(setAuthStatus(STATUS.ERROR));
        return;
      }
      SweetAlertRecoverySuccess('/authLogin');
      dispatch(setAuthStatus(STATUS.IDLE));
    } catch (err) {
      dispatch(setAuthError('Server offline'));
      dispatch(setAuthStatus(STATUS.ERROR));
      console.log(err.message);
    }
  };
};

export const startVerifyToken = (token) => {
  return async (dispatch) => {
    try {

      dispatch(setAuthStatus(STATUS.CHECKING));

      const res = await fetch(`${API_URL}/api/auth/verify-token`, {
        method: 'GET',
        headers: {
          authorization: token
        }
      })

      const data = await res.json();

      if (!res.ok) {
        dispatch(setAuthError(data.message));
        dispatch(authLogout());
        return;
      }

      dispatch(setAuthStatus(STATUS.SUCCESS));

    } catch (error) {
      dispatch(setAuthError('Server offline'));
      console.log(error.message);
    }
  };
};