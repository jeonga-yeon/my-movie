import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getGenreTvThunk = createAsyncThunk(
  "genreTv/getGenreTvThunk",
  async (genre, thunkAPI) => {
    try {
      const tvShowsByGenre = await api.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genre}`
      );

      return { tvShowsByGenre: tvShowsByGenre.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  tvShowsByGenre: {},
  loading: true,
  error: null,
  sort: {},
};

const genreTv = createSlice({
  name: "genreTvReducer",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getGenreTvThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGenreTvThunk.fulfilled, (state, action) => {
        state.tvShowsByGenre = action.payload.tvShowsByGenre;
        state.loading = false;
      })
      .addCase(getGenreTvThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default genreTv;
