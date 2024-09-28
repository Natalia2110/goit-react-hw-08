import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
  // number: "",
};
const filtersSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
      // state.number = action.payload;
    },
  },
});

export const filtersReduser = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;
// export const selectNameFilter = (state) => state.filter.name;
