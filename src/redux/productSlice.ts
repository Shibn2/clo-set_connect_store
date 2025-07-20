import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, PricingOption, product, ProductListState } from '../types';
import { PAGE_SIZE } from '../constants';

const initialState: ProductListState = {
  ogProductList: [],
  filteredProductList: [],
  productList: [],
  page: 0,
};

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    filterProductList: (state, action: PayloadAction<FilterState>) => {
      state.page = 0;
      const start = 0;
      const filters = action.payload;
      const end = state.page * PAGE_SIZE + PAGE_SIZE;
      state.filteredProductList = state.ogProductList?.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
        const matchesPricing =
          filters.pricingOptions.length === 0 ||
          filters.pricingOptions.includes(product.pricingOption);
        return matchesSearch && matchesPricing;
      });
      state.productList = state.filteredProductList.slice(start, end);
      state.page += 1;
    },
    // As per subsequent pagevisibility
    updateProductList: (state) => {
      const start = 0;
      const end = state.page * PAGE_SIZE + PAGE_SIZE;
      state.productList = state.filteredProductList.slice(start, end);
      state.page += 1;
    },
    // Optional: Replace product list
    setProductList: (state, action: PayloadAction<product[]>) => {
      const start = 0;
      const end = state.page * PAGE_SIZE + PAGE_SIZE;
      state.ogProductList = action.payload;
      state.filteredProductList = action.payload;
      state.productList = state.filteredProductList.slice(start, end);
      state.page += 1;
    },
  },
});

export const { filterProductList, updateProductList, setProductList } = productSlice.actions;
export default productSlice.reducer;
