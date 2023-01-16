/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import { getMoivesThunk } from "../redux/modules/movieSlice";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { getTvShowsThunk } from "../redux/modules/tvShowSlice";
import MovieSlide from "../components/MovieSlide";
import TvSlide from "../components/TvSlide";

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .spinner {
    margin-top: 200px;
  }
`;

const Wrapper = styled.div`
  h1 {
    margin-left: 100px;
    margin-top: 20px;
    font-size: 30px;
  }
  padding-bottom: 70px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movies);
  const { popularTvShows, topRatedTvShows } = useSelector(
    (state) => state.tvShows
  );
  useEffect(() => {
    dispatch(getMoivesThunk());
    dispatch(getTvShowsThunk());
  }, []);
  if (loading)
    return (
      <Loading>
        <ClipLoader
          className="spinner"
          color="white"
          loading={loading}
          size={150}
        />
      </Loading>
    );
  return (
    <Wrapper className="Wrapper">
      <Banner movie={popularMovies.results[0]} />
      <h1>Popular Movies</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top Rated Movies</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies} />
      <h1>Popular TV Shows</h1>
      <TvSlide tvShows={popularTvShows} />
      <h1>Top Rated TV Shows</h1>
      <TvSlide tvShows={topRatedTvShows} />
    </Wrapper>
  );
};

export default Home;
