import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getGenreMovieThunk = createAsyncThunk(
  "genreMovie/getGenreMovieThunk",
  async (genre, thunkAPI) => {
    try {
      const moviesByGenre = await api.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre}`
      );

      return { moviesByGenre: moviesByGenre.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  moviesByGenre: {},
  loading: true,
  error: null,
  sort: {},
};

const genreMovies = createSlice({
  name: "genreMovieReducer",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getGenreMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGenreMovieThunk.fulfilled, (state, action) => {
        state.moviesByGenre = action.payload.moviesByGenre;
        state.loading = false;
      })
      .addCase(getGenreMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default genreMovies;
