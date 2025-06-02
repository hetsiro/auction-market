import {
  setAppActualItem,
  setAppStatus,
  setAppTopRated,
  updateAppSearchedItems,
  updateAppSearch,
  updateAppItemsSearchedCache,
  updateAppActualItemCache,
} from './AppSlice';
import { API_URL } from '../../config/api';
import { STATUS } from '../../constants/status';

export const startSearchingProducts = (search, page, category = '') => {
  const URL = `${API_URL}/api/products?q=${search}&page=${page}${category === '' ? '' : `&category=${category}`}`;

  return async (dispatch, getState) => {
    const cacheKey = `${search.trim().toLowerCase()}_category${category}_page${page}`;
    const { itemsSearchedCache } = getState().app;

    if (itemsSearchedCache[cacheKey]) {
      dispatch(updateAppSearchedItems(itemsSearchedCache[cacheKey]));
      dispatch(updateAppSearch(search));
      return;
    }

    dispatch(setAppStatus(STATUS.CHECKING));

    const response = await fetch(URL);
    const data = await response.json();

    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 500);
    });

    dispatch(updateAppSearch(search));
    dispatch(updateAppSearchedItems(data));
    dispatch(updateAppItemsSearchedCache({ cacheKey, results: data }));

    dispatch(setAppStatus(STATUS.SUCCESS));
  };
};

export const startSettingActualProduct = (id) => {
  const url = `${API_URL}/api/products/${id}`;

  return async (dispatch, getState) => {
    const { actualItemCache } = getState().app;

    if (actualItemCache[id]) {
      dispatch(setAppActualItem(actualItemCache[id]));
      return;
    }

    dispatch(setAppStatus(STATUS.CHECKING));

    const response = await fetch(url);
    const data = await response.json();

    dispatch(setAppActualItem(data));
    dispatch(updateAppActualItemCache({ cacheKey: id, results: data }));

    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 500);
    });

    dispatch(setAppStatus(STATUS.SUCCESS));
  };
};

export const startGettingTopRatedProducts = () => {
  const url = `${API_URL}/api/products/top-rated`;

  return async (dispatch, getState) => {
    const {
      loadedFlags: { isTopRatedLoaded },
      status,
    } = getState().app;
    const firstLoading = status === STATUS.FIRST_LOADING;

    if (isTopRatedLoaded) {
      dispatch(setAppStatus(STATUS.SUCCESS));
      return;
    }

    if (!firstLoading) dispatch(setAppStatus(STATUS.CHECKING));

    const response = await fetch(url);
    const data = await response.json();

    dispatch(setAppTopRated(data));

    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 500);
    });

    dispatch(setAppStatus(STATUS.SUCCESS));
  };
};
