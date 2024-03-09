// counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters  : {}
}

// Create a slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Add a reducer function to update selectedFilters
    updateFilter: (state, action) => {

        console.log('actionPayload',action.payload)
          state.filters = action.payload;
        //  console.log(state.filters)
    //   const filter = action.payload;
    //   if (state.selectedFilters.includes(filter)) {
    //     state.selectedFilters = state.selectedFilters.filter((selected) => selected !== filter);
    //   } else {
    //     state.selectedFilters.push(filter);
    //   }
    },
    // Add other reducer functions as needed
  },
});

// Export actions
export const { updateFilter } = filterSlice.actions;

// Export reducer
export default filterSlice.reducer;

// Optionally, you can also export selectors if needed
// export const selectFilters = (state) => state.filter.selectedFilters;



