import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movie from "./modules/movieDetailSlice";
import filteredMovies from "./modules/movieFilteringSlice";
import movies from "./modules/movieSlice";
import tvShow from "./modules/tvDetailSlice";
import tvShows from "./modules/tvShowSlice";

const rootReducer = combineReducers({
  movies: movies.reducer,
  tvShows: tvShows.reducer,
  movie: movie.reducer,
  tvShow: tvShow.reducer,
  filteredMovies: filteredMovies.reducer,
});

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
