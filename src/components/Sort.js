/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortMovies } from "../redux/modules/movieFilteringSlice";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 300px;
  border: 2px solid white;
  border-radius: 30px;
  color: white;
  margin-bottom: 20px;
`;

const BeforeClick = styled.div`
  box-sizing: border-box;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  .arrow:hover {
    cursor: pointer;
  }
`;

const AfterClick = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
  height: 100px;
  border-top: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 20px;
  }
  span:nth-child(2) {
    font-size: 10px;
    color: #2980b9;
    margin: 10px 0px;
  }
  .sort {
    height: 25px;
    border: 1px solid white;
    background-color: black;
    color: white;
    option {
      height: 20px;
    }
  }
`;

const Sort = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const {
    moviesByPopularity,
    moviesByReleaseDate,
    moviesByTitleDesc,
    moviesByTitleAsc,
  } = useSelector((state) => state.filteredMovies);

  const handleSort = (event) => {
    const id = event.target.value;
    switch (id) {
      case "0":
        return dispatch(sortMovies(moviesByPopularity));
      case "1":
        return dispatch(sortMovies(moviesByReleaseDate));
      case "2":
        return dispatch(sortMovies(moviesByTitleDesc));
      case "3":
        return dispatch(sortMovies(moviesByTitleAsc));
      default:
        return dispatch(sortMovies(moviesByPopularity));
    }
  };

  return (
    <Wrapper>
      <BeforeClick>
        <span>Sort</span>
        {click ? (
          <FontAwesomeIcon
            icon={faArrowDown}
            onClick={() => setClick(false)}
            className="arrow"
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={() => setClick(true)}
            className="arrow"
          />
        )}
      </BeforeClick>
      {click ? (
        <AfterClick>
          <span>Sort Results By</span>
          <span>Sort By</span>
          <select
            name="sort"
            id="sort-select"
            className="sort"
            onChange={handleSort}
          >
            <option value="">None</option>
            <option value={0}>Popularity</option>
            <option value={1}>Release Date</option>
            <option value={2}>Title (Desc)</option>
            <option value={3}>Title (Asc)</option>
          </select>
        </AfterClick>
      ) : null}
    </Wrapper>
  );
};

export default Sort;
