import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovieDetailThunk = createAsyncThunk(
  "movieDetail/getMovieDetailThunk",
  async (id, thunkAPI) => {
    try {
      const movieDetailApi = await api.get(
        `/movie/${id}?api_key=${API_KEY}&language=en-US`
      );

      const movieDetail = movieDetailApi.data;
      return movieDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  movieDetail: {},
  loading: true,
  error: null,
};

const movie = createSlice({
  name: "movieDetailReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetailThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieDetailThunk.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.loading = false;
      })
      .addCase(getMovieDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default movie;
