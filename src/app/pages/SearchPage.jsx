import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';

import { startSearchingProducts } from '../../store/app/appThunks';
import { MainSearch } from '../components';
import { LayoutUp } from '../layout';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const query = searchParams.get('q');
  const queryPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(startSearchingProducts(query, queryPage));
  }, [dispatch, query]);

  return (
    <>
      <LayoutUp>
        <MainSearch />
      </LayoutUp>
    </>
  );
};
