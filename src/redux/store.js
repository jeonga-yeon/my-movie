import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movies from "./modules/movieSlice";
import tvShows from "./modules/tvShowSlice";

const rootReducer = combineReducers({
  movies: movies.reducer,
  tvShows: tvShows.reducer,
});

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
