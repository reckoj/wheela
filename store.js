import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import carReducer from "./slices/carSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["car"],
};

const reducer = combineReducers({
  car: carReducer,
  nav: navReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
