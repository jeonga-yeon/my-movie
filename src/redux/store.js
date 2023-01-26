import { combineReducers, configureStore } from "@reduxjs/toolkit";
import genreMovies from "./modules/genreMovieSlide";
import genreTv from "./modules/genreTvSlice";
import movie from "./modules/movieDetailSlice";
import filteredMovies from "./modules/movieFilteringSlice";
import movies from "./modules/movieSlice";
import search from "./modules/searchSlice";
import tvShow from "./modules/tvDetailSlice";
import filteredTv from "./modules/tvFilteringSlice";
import tvShows from "./modules/tvShowSlice";

const rootReducer = combineReducers({
  movies: movies.reducer,
  tvShows: tvShows.reducer,
  movie: movie.reducer,
  tvShow: tvShow.reducer,
  filteredMovies: filteredMovies.reducer,
  filteredTv: filteredTv.reducer,
  genreMovies: genreMovies.reducer,
  genreTv: genreTv.reducer,
  search: search.reducer,
});

let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
