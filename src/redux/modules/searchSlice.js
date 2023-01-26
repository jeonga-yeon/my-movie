import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getSearchThunk = createAsyncThunk(
  "search/getSearchThunk",
  async (query, thunkAPI) => {
    try {
      const searchMovieApi = api.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      );

      const searchTvApi = api.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      );

      const [searchMovie, searchTv] = await Promise.all([
        searchMovieApi,
        searchTvApi,
      ]);

      return {
        searchMovie: searchMovie.data,
        searchTv: searchTv.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  searchMovie: {},
  searchTv: {},
  sort: {},
  loading: true,
  error: null,
};

const search = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    sortSearchReducer: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchThunk.fulfilled, (state, action) => {
        state.searchMovie = action.payload.searchMovie;
        state.searchTv = action.payload.searchTv;
        state.loading = false;
      })
      .addCase(getSearchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { sortSearchReducer } = search.actions;

export const sortSearch = (value) => {
  return (dispatch) => {
    dispatch(sortSearchReducer(value));
  };
};

export default search;
