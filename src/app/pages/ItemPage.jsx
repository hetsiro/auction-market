import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { startSettingActualProduct } from '../../store/app/appThunks';
import { Loading, MainItem } from '../components';
import { LayoutUp } from '../layout';

export const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSettingActualProduct(id));
  }, [dispatch, id]);

  return (
    <>
      <Loading />
      <LayoutUp>
        <MainItem />
      </LayoutUp>
    </>
  );
};
