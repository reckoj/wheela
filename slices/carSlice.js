import { createSlice } from "@reduxjs/toolkit";
const defaultMake = { cars: "Select Make" };
const defaultModel = { make: "Select Model" };
const defaultYear = { make: "Select Year" };

const initialState = {
  make: defaultMake,
  model: defaultModel,
  year: defaultYear,
};
export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setMake: (state, action) => {
      state.make = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setMake, setModel, setYear } = carSlice.actions;

export const selectMake = (state) => state.cars.make;
export const selectModel = (state) => state.cars.model;
export const selectYear = (state) => state.cars.year;

export default carSlice.reducer;
