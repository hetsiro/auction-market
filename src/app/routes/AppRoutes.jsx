import { Navigate, Route, Routes } from 'react-router';

import { Loading } from '../components';
import NavBar from '../components/NavBar/NavBar';
import { HomePage, ItemPage, SearchPage } from '../pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/auth/AuthSlice';

export const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) dispatch(authLogout());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <Loading />

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/item/:id" element={<ItemPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
