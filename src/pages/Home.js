/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import { getMoivesThunk } from "../redux/modules/movieSlice";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import MovieSlide from "../components/MovieSlide";

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .spinner {
    margin-top: 200px;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getMoivesThunk());
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
    <div>
      <Banner movie={popularMovies.results[0]} />
      <h1>Popular Movies</h1>
      <MovieSlide />
      <h1>Top Rated Movies</h1>
      <MovieSlide />
      <h1>Upcoming Movies</h1>
      <MovieSlide />
    </div>
  );
};

export default Home;
