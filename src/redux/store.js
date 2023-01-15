import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movies from "./modules/movieSlice";

const rootReducer = combineReducers({
  movies: movies.reducer,
});

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
