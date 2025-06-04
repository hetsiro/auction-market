import { Navigate, Route, Routes } from 'react-router';
import {
  LoginPage,
  RecoveryPage,
  RegisterPage,
  ResetPasswordPage,
} from '../pages';

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};
