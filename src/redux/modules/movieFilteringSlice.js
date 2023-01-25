import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovieFilterThunk = createAsyncThunk(
  "movieFilter/getMovieFilterThunk",
  async (thunkAPI) => {
    try {
      const moviesByPopularityApi = api.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
      );
      const moviesByReleaseApi = api.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc`
      );
      const moviesByTitleDescApi = api.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=original_title.desc`
      );
      const moviesByTitleAscApi = api.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=original_title.asc`
      );

      const [
        moviesByPopularity,
        moviesByReleaseDate,
        moviesByTitleDesc,
        moviesByTitleAsc,
      ] = await Promise.all([
        moviesByPopularityApi,
        moviesByReleaseApi,
        moviesByTitleDescApi,
        moviesByTitleAscApi,
      ]);

      return {
        moviesByPopularity: moviesByPopularity.data,
        moviesByReleaseDate: moviesByReleaseDate.data,
        moviesByTitleDesc: moviesByTitleDesc.data,
        moviesByTitleAsc: moviesByTitleAsc.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  moviesByPopularity: {},
  moviesByReleaseDate: {},
  moviesByTitleDesc: {},
  moviesByTitleAsc: {},
  loading: true,
  error: null,
  sort: {},
};

const filteredMovies = createSlice({
  name: "filteredMoviesReducer",
  initialState,
  reducers: {
    sortReducer: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieFilterThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieFilterThunk.fulfilled, (state, action) => {
        state.moviesByPopularity = action.payload.moviesByPopularity;
        state.moviesByReleaseDate = action.payload.moviesByReleaseDate;
        state.moviesByTitleDesc = action.payload.moviesByTitleDesc;
        state.moviesByTitleAsc = action.payload.moviesByTitleAsc;
        state.loading = false;
      })
      .addCase(getMovieFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { sortReducer } = filteredMovies.actions;

export const sortMovies = (value) => {
  return (dispatch) => {
    dispatch(sortReducer(value));
  };
};

export default filteredMovies;
