import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
