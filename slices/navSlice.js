import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  // make: null,
  // model: null,
  // year: null,
  // vehicleInformation: null
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    // setVehicleInformation: (state, action) => {
    //   state.vehicleInformation = action.payload;
    // },
    // setMake: (state, action) => {
    //   state.make = action.payload;
    // },
    // setModel: (state, action) => {
    //   state.model = action.payload;
    // },
    // setYear: (state, action) => {
    //   state.year = action.payload;
    // },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

//selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
//   export const selectVehcicleInformation = (state) =>
//   state.nav.vehicleInformation;
//   export const selectMake = (state) => state.nav.make;
// export const selectModel = (state) => state.nav.model;
// export const selectYear = (state) => state.nav.year;

export default navSlice.reducer;
