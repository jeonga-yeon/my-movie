import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getTvDetailThunk = createAsyncThunk(
  "tvDetail/getTvDetailThunk",
  async (id, thunkAPI) => {
    try {
      const tvDetailApi = api.get(
        `/tv/${id}?api_key=${API_KEY}&language=en-US`
      );

      const tvReviewsApi = api.get(
        `/tv/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );

      const tvRecommendationApi = api.get(
        `/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );

      const [tvDetail, tvReviews, tvRecommendation] = await Promise.all([
        tvDetailApi,
        tvReviewsApi,
        tvRecommendationApi,
      ]);
      return {
        tvDetail: tvDetail.data,
        tvReviews: tvReviews.data,
        tvRecommendation: tvRecommendation.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  tvDetail: {},
  tvReviews: {},
  tvRecommendation: {},
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
        state.tvDetail = action.payload.tvDetail;
        state.tvReviews = action.payload.tvReviews;
        state.tvRecommendation = action.payload.tvRecommendation;
        state.loading = false;
      })
      .addCase(getTvDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default tvShow;
