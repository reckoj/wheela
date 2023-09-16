import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  make: null,
  model: null,
  year: null,
  vehicleInformationMake: null,
  vehicleInformationModel: null,
  vehicleInformationYear: null,
};

export const carSlice = createSlice({
  name: 'car',
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
    setVehicleInformationMake: (state, action) => {
      state.vehicleInformationMake = action.payload;
    },

    setVehicleInformationModel: (state, action) => {
      state.vehicleInformationModel = action.payload;
    },

    setVehicleInformationYear: (state, action) => {
      state.vehicleInformationYear = action.payload;
    },
  },
});

export const { setMake, setModel, setYear,setVehicleInformationMake, setVehicleInformationModel, setVehicleInformationYear} = carSlice.actions;

export const selectMake = (state) => state.car.make;
export const selectModel = (state) => state.car.model;
export const selectYear = (state) => state.car.year;
export const selectVehcicleInformationMake = (state) =>
state.car.vehicleInformationMake;
export const selectVehcicleInformationModel = (state) =>
state.car.vehicleInformationModel;
export const selectVehcicleInformationYear = (state) =>
state.car.vehicleInformationYear;

export default carSlice.reducer;
