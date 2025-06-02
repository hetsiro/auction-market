import { Navigate, Route, Routes } from 'react-router';

import { Loading } from '../components';
import NavBar from '../components/NavBar/NavBar';
import { HomePage, ItemPage, SearchPage } from '../pages';

export const AppRoutes = () => {
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
