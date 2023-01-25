/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortMovies } from "../redux/modules/movieFilteringSlice";
import { getGenreMovieThunk } from "../redux/modules/genreMovieSlide";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 300px;
  border: 2px solid white;
  border-radius: 30px;
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
  border-top: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 20px;
  }
  .genres {
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px;
    span {
      margin-right: 10px;
      background-color: #dc143d;
      display: inline-block;
      font-size: 12px;
      padding: 7px;
      border-radius: 10px;
      font-weight: 600;
      margin-bottom: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Filter = () => {
  const [click, setClick] = useState(false);
  const { movieGenreList } = useSelector((state) => state.movies);
  const { moviesByGenre } = useSelector((state) => state.genreMovies);
  const dispatch = useDispatch();

  const handleGenre = (genre) => {
    dispatch(getGenreMovieThunk(genre));
  };

  useEffect(() => {
    dispatch(sortMovies(moviesByGenre));
  }, [moviesByGenre]);

  return (
    <Wrapper>
      <BeforeClick>
        <span>Filter</span>
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
          <span>Genres</span>
          <div className="genres">
            {movieGenreList.map((genre, index) => (
              <span key={index} onClick={() => handleGenre(genre.id)}>
                {genre.name}
              </span>
            ))}
          </div>
        </AfterClick>
      ) : null}
    </Wrapper>
  );
};

export default Filter;
