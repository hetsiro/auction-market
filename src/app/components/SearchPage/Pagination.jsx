import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';

import { startSearchingProducts } from '../../../store/app/appThunks';

export const PaginationSearch = () => {
  const { totalCategoryPages, search, page } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const handleChangePage = (event, value) => {
    dispatch(startSearchingProducts(search, value, category));
    navigate(`/search/?q=${search}&page=${value}&category=${category}`);
  };

  return (
    <>
      {totalCategoryPages > 0 && (
        <Pagination
          page={page}
          count={totalCategoryPages}
          variant="outlined"
          color="primary"
          size="large"
          siblingCount={0}
          onChange={handleChangePage}
        />
      )}
    </>
  );
};
