/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import { useEffect } from "react";
import { getMovieFilterThunk } from "../redux/modules/movieFilteringSlice";
import MoviePageCard from "../components/MoviePageCard";
import Loading from "../components/Loading";
import { getMoivesThunk } from "../redux/modules/movieSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const Filtering = styled.div`
  margin-right: 15px;
`;

const FilteredMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 350px);
  gap: 30px;
  margin-left: 15px;
  margin-bottom: 70px;
`;

const Movies = () => {
  const dispatch = useDispatch();
  const { moviesByPopularity, sort, loading } = useSelector(
    (state) => state.filteredMovies
  );

  useEffect(() => {
    dispatch(getMovieFilterThunk());
    dispatch(getMoivesThunk());
  }, []);

  const movies = Object.keys(sort).length === 0 ? moviesByPopularity : sort;

  if (loading) return <Loading loading={loading} />;

  return (
    <Container>
      <Wrapper>
        <Filtering>
          <Sort />
          <Filter />
        </Filtering>
        <FilteredMovies>
          {movies.results?.map((movie, index) => (
            <MoviePageCard key={index} movie={movie} />
          ))}
        </FilteredMovies>
      </Wrapper>
    </Container>
  );
};

export default Movies;
