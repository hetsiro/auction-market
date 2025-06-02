import { setCartStatus, setItemsCart } from './CartSlice';
import { API_URL } from '../../config';
import { STATUS } from '../../constants';
import { setAuthError } from '../auth/AuthSlice';

export const startUpdatingCartToDB = (items) => {
  return async (dispatch) => {
    try {
      dispatch(setCartStatus(STATUS.CHECKING));

      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/api/cart/update-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        dispatch(setCartStatus(STATUS.ERROR));
        return;
      }

      dispatch(setCartStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setAuthError('Server offline'));
      console.log(error.message);
    }
  };
};

export const startGettingCartFromDB = () => {
  return async (dispatch) => {
    try {
      dispatch(setCartStatus(STATUS.CHECKING));

      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/api/cart/get-cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        cart: { items },
      } = await res.json();

      if (!res.ok) {
        dispatch(setCartStatus(STATUS.ERROR));
        return;
      }

      dispatch(setItemsCart(items));
      dispatch(setCartStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setAuthError('Server offline'));
      console.log(error.message);
    }
  };
};
