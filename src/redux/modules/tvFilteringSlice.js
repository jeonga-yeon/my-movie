import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getTvFilterThunk = createAsyncThunk(
  "tvFilter/getTvFilterThunk",
  async (thunkAPI) => {
    try {
      const tvByPopularityApi = api.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
      );
      const tvByReleaseApi = api.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc`
      );
      const tvByTitleDescApi = api.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=original_title.desc`
      );
      const tvByTitleAscApi = api.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=original_title.asc`
      );

      const [tvByPopularity, tvByReleaseDate, tvByTitleDesc, tvByTitleAsc] =
        await Promise.all([
          tvByPopularityApi,
          tvByReleaseApi,
          tvByTitleDescApi,
          tvByTitleAscApi,
        ]);

      return {
        tvByPopularity: tvByPopularity.data,
        tvByReleaseDate: tvByReleaseDate.data,
        tvByTitleDesc: tvByTitleDesc.data,
        tvByTitleAsc: tvByTitleAsc.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  tvByPopularity: {},
  tvByReleaseDate: {},
  tvByTitleDesc: {},
  tvByTitleAsc: {},
  loading: true,
  error: null,
  sort: {},
};

const filteredTv = createSlice({
  name: "filteredTvReducer",
  initialState,
  reducers: {
    sortTvReducer: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTvFilterThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTvFilterThunk.fulfilled, (state, action) => {
        state.tvByPopularity = action.payload.tvByPopularity;
        state.tvByReleaseDate = action.payload.tvByReleaseDate;
        state.tvByTitleDesc = action.payload.tvByTitleDesc;
        state.tvByTitleAsc = action.payload.tvByTitleAsc;
        state.loading = false;
      })
      .addCase(getTvFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { sortTvReducer } = filteredTv.actions;

export const sortTv = (value) => {
  return (dispatch) => {
    dispatch(sortTvReducer(value));
  };
};

export default filteredTv;
