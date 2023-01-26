/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MoviePageCard from "../components/MoviePageCard";
import TvPageCard from "../components/TvPageCard";
import Loading from "../components/Loading";
import { getMoivesThunk } from "../redux/modules/movieSlice";
import { useState } from "react";
import { getSearchThunk, sortSearch } from "../redux/modules/searchSlice";
import { getTvShowsThunk } from "../redux/modules/tvShowSlice";
import { useSearchParams } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const Filtering = styled.div`
  margin-right: 15px;
`;

const Category = styled.div`
  width: 300px;
  border: 2px solid white;
  border-radius: 30px;
  color: white;
  margin-bottom: 20px;
  &:hover {
    background-color: #192a56;
    cursor: pointer;
  }
  div {
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  }
`;

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 350px);
  gap: 30px;
  margin-left: 15px;
  margin-bottom: 70px;
`;

const Search = () => {
  const [query, setQuery] = useSearchParams();
  const [movieClick, setMovieClick] = useState(false);
  const [tvClick, setTvClick] = useState(false);
  const dispatch = useDispatch();
  const { searchMovie, searchTv, loading } = useSelector(
    (state) => state.search
  );

  console.log(query.get("q"));

  useEffect(() => {
    dispatch(getSearchThunk(query.get("q")));
    dispatch(getMoivesThunk());
    dispatch(getTvShowsThunk());
  }, []);

  if (loading) return <Loading loading={loading} />;

  return (
    <Container>
      <Wrapper>
        <Filtering>
          <Category
            onClick={() => {
              setMovieClick(true);
              setTvClick(false);
              dispatch(sortSearch(searchMovie));
            }}
          >
            <div>Movie</div>
          </Category>
          <Category
            onClick={() => {
              setTvClick(true);
              setMovieClick(false);
              dispatch(sortSearch(searchTv));
            }}
          >
            <div>Tv Show</div>
          </Category>
        </Filtering>
        {tvClick ? (
          <SearchResults className="search-tv">
            {searchTv.results?.map((tvShow, index) => (
              <TvPageCard key={index} tvShow={tvShow} />
            ))}
          </SearchResults>
        ) : (
          <SearchResults className="search-movie">
            {searchMovie.results?.map((movie, index) => (
              <MoviePageCard key={index} movie={movie} />
            ))}
          </SearchResults>
        )}
      </Wrapper>
    </Container>
  );
};

export default Search;
