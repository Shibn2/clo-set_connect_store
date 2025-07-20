import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, PricingOption } from '../types';

const initialFilterState: FilterState = {
  pricingOptions: [],
  searchTerm: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialFilterState,
  reducers: {
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOptions = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearFilters: () => initialFilterState,
  },
});

export const { setPricingOptions, setSearchTerm } = filterSlice.actions;
export default filterSlice.reducer;
