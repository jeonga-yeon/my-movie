import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovieDetailThunk = createAsyncThunk(
  "movieDetail/getMovieDetailThunk",
  async (id, thunkAPI) => {
    try {
      const movieDetailApi = api.get(
        `/movie/${id}?api_key=${API_KEY}&language=en-US`
      );

      const movieReviewsApi = api.get(
        `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );

      const movieRecommendationApi = api.get(
        `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );

      const movieTrailerApi = api.get(
        `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );

      const [movieDetail, movieReviews, movieRecommendation, movieTrailer] =
        await Promise.all([
          movieDetailApi,
          movieReviewsApi,
          movieRecommendationApi,
          movieTrailerApi,
        ]);
      return {
        movieDetail: movieDetail.data,
        movieReviews: movieReviews.data,
        movieRecommendation: movieRecommendation.data,
        movieTrailer: movieTrailer.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

let initialState = {
  movieDetail: {},
  movieReviews: {},
  movieRecommendation: {},
  movieTrailer: {},
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
        state.movieDetail = action.payload.movieDetail;
        state.movieReviews = action.payload.movieReviews;
        state.movieRecommendation = action.payload.movieRecommendation;
        state.movieTrailer = action.payload.movieTrailer;
        state.loading = false;
      })
      .addCase(getMovieDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default movie;
