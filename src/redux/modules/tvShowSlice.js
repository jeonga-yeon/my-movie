import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getTvShowsThunk = createAsyncThunk(
  "tvShows/getTvShowsThunk",
  async (thunkAPI) => {
    try {
      const popularTvApi = api.get(
        `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topRatedTvApi = api.get(
        `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const tvGenreApi = api.get(
        `/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );

      const [popularTvShows, topRatedTvShows, tvGenreList] = await Promise.all([
        popularTvApi,
        topRatedTvApi,
        tvGenreApi,
      ]);

      return {
        popularTvShows: popularTvShows.data,
        topRatedTvShows: topRatedTvShows.data,
        tvGenreList: tvGenreList.data.genres,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  popularTvShows: {},
  topRatedTvShows: {},
  tvGenreList: [],
  tvLoading: true,
  error: null,
};

const tvShows = createSlice({
  name: "tvShowsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTvShowsThunk.pending, (state) => {
        state.tvLoading = true;
      })
      .addCase(getTvShowsThunk.fulfilled, (state, action) => {
        state.popularTvShows = action.payload.popularTvShows;
        state.topRatedTvShows = action.payload.topRatedTvShows;
        state.tvGenreList = action.payload.tvGenreList;
        state.tvLoading = false;
      })
      .addCase(getTvShowsThunk.rejected, (state, action) => {
        state.tvLoading = false;
        state.error = action.error;
      });
  },
});

export default tvShows;
