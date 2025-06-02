import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actualItem: null,
  actualItemCache: {},
  itemsSearched: [],
  itemsSearchedCache: {},
  topRated: [],
  categories: [],
  search: '',
  totalPages: [],
  totalProducts: 0,
  totalCategoryProducts: 0,
  totalCategoryPages: 0,
  page: 1,
  status: 'first-loading', // 'idle' || 'checking' || 'success' || 'error' || 'first-loading'
  loadedFlags: {
    isTopRatedLoaded: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppSearch: (state, { payload }) => {
      state.search = payload;
    },
    updateAppSearchedItems: (state, { payload }) => {
      state.totalPages = payload.totalPages;
      state.totalCategoryPages = payload.totalCategoryPages;
      state.totalProducts = payload.totalProducts;
      state.totalCategoryProducts = payload.totalCategoryProducts;
      state.page = payload.page;
      state.itemsSearched = payload.products;
      state.categories = payload.mappedCategories;
    },
    updateAppItemsSearchedCache: (state, { payload }) => {
      const { cacheKey, results } = payload;
      state.itemsSearchedCache[cacheKey] = results;
    },
    updateAppActualItemCache: (state, { payload }) => {
      const { cacheKey, results } = payload;
      state.actualItemCache[cacheKey] = results;
    },
    updateAppPage: (state, { payload }) => {
      state.page = payload;
    },
    setAppTopRated: (state, { payload }) => {
      state.topRated = payload;
      state.loadedFlags.isTopRatedLoaded = true;
    },
    setAppActualItem: (state, { payload }) => {
      state.actualItem = payload;
    },
    setAppStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const {
  uploadItems,
  updateAppSearch,
  updateAppPage,
  updateAppSearchedItems,
  updateAppItemsSearchedCache,
  updateAppActualItemCache,
  setAppTopRated,
  setAppActualItem,
  setAppStatus,
} = appSlice.actions;

export default appSlice.reducer;
