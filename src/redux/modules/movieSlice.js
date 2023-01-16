import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMoivesThunk = createAsyncThunk(
  "movies/getMoviesThunk",
  async (thunkAPI) => {
    try {
      const popularMoviesApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const upcomingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const movieGenreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      const [popularMovies, topRatedMovies, upcomingMovies, movieGenreList] =
        await Promise.all([
          popularMoviesApi,
          topRatedApi,
          upcomingApi,
          movieGenreApi,
        ]);

      return {
        popularMovies: popularMovies.data,
        topRatedMovies: topRatedMovies.data,
        upcomingMovies: upcomingMovies.data,
        movieGenreList: movieGenreList.data.genres,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  movieGenreList: [],
  loading: true,
  error: null,
};

const movies = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoivesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoivesThunk.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.topRatedMovies = action.payload.topRatedMovies;
        state.upcomingMovies = action.payload.upcomingMovies;
        state.movieGenreList = action.payload.movieGenreList;
        state.loading = false;
      })
      .addCase(getMoivesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default movies;
