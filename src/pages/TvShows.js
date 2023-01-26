/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { getTvShowsThunk } from "../redux/modules/tvShowSlice";
import { getTvFilterThunk } from "../redux/modules/tvFilteringSlice";
import TvPageCard from "../components/TvPageCard";
import TvSort from "../components/TvSort";
import TvFilter from "../components/TvFilter";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const Filtering = styled.div`
  margin-right: 15px;
`;

const FilteredTv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 350px);
  gap: 30px;
  margin-left: 15px;
  margin-bottom: 70px;
`;

const TvShows = () => {
  const dispatch = useDispatch();
  const { tvByPopularity, sort, loading } = useSelector(
    (state) => state.filteredTv
  );

  useEffect(() => {
    dispatch(getTvFilterThunk());
    dispatch(getTvShowsThunk());
  }, []);

  const tvShows = Object.keys(sort).length === 0 ? tvByPopularity : sort;

  if (loading) return <Loading loading={loading} />;

  return (
    <Container>
      <Wrapper>
        <Filtering>
          <TvSort />
          <TvFilter />
        </Filtering>
        <FilteredTv>
          {tvShows.results?.map((tvShow, index) => (
            <TvPageCard key={index} tvShow={tvShow} />
          ))}
        </FilteredTv>
      </Wrapper>
    </Container>
  );
};

export default TvShows;
