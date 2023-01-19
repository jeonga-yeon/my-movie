import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getTvDetailThunk = createAsyncThunk(
  "tvDetail/getTvDetailThunk",
  async (id, thunkAPI) => {
    try {
      const tvDetailApi = await api.get(
        `/tv/${id}?api_key=${API_KEY}&language=en-US`
      );

      const tvDetail = tvDetailApi.data;
      return tvDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  tvDetail: {},
  loading: true,
  error: null,
};

const tvShow = createSlice({
  name: "tvDetailReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTvDetailThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTvDetailThunk.fulfilled, (state, action) => {
        state.tvDetail = action.payload;
        state.loading = false;
      })
      .addCase(getTvDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default tvShow;
