import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { AppRoutes } from '../app/routes/AppRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { STATUS } from '../constants/status';
import { useEffect } from 'react';
import { startVerifyToken } from '../store/auth/authThunks';
import { AuthLoading } from '../auth/components/Loading';
import { setAuthStatus } from '../store/auth/AuthSlice';

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const success = status === STATUS.SUCCESS;
  const checking = status === STATUS.CHECKING;
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(startVerifyToken(token));
    } else {
      dispatch(setAuthStatus(STATUS.IDLE));
    }
  }, [dispatch]);

  if (checking) return <AuthLoading />;

  return (
    <>
      <Routes>
        <Route path="/*" element={success ? <AppRoutes /> : <AuthRoutes />} />
      </Routes>
    </>
  );
};
