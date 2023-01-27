/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import { getMoivesThunk } from "../redux/modules/movieSlice";
import styled from "styled-components";
import { getTvShowsThunk } from "../redux/modules/tvShowSlice";
import MovieSlide from "../components/MovieSlide";
import TvSlide from "../components/TvSlide";
import Loading from "../components/Loading";

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
  const { popularTvShows, topRatedTvShows, tvLoading } = useSelector(
    (state) => state.tvShows
  );
  useEffect(() => {
    dispatch(getMoivesThunk());
    dispatch(getTvShowsThunk());
  }, []);
  if (loading || tvLoading) return <Loading loading={loading} />;
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
