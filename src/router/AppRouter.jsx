import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { AppRoutes } from '../app/routes/AppRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { STATUS } from '../constants/status';

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const success = status === STATUS.SUCCESS;

  return (
    <Routes>
      {<Route path="/*" element={success ? <AppRoutes /> : <AuthRoutes />} />}
    </Routes>
  );
};
