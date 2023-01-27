/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGenreTvThunk } from "../redux/modules/genreTvSlice";
import { sortTv } from "../redux/modules/tvFilteringSlice";

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
      background: linear-gradient(to right top, yellow, red);
      display: inline-block;
      font-size: 12px;
      padding: 12px;
      border-radius: 12px;
      font-weight: 600;
      margin-bottom: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const TvFilter = () => {
  const [click, setClick] = useState(false);
  const { tvGenreList } = useSelector((state) => state.tvShows);
  const { tvShowsByGenre } = useSelector((state) => state.genreTv);
  const dispatch = useDispatch();

  const handleGenre = (genre) => {
    dispatch(getGenreTvThunk(genre));
  };

  useEffect(() => {
    dispatch(sortTv(tvShowsByGenre));
  }, [tvShowsByGenre]);

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
            {tvGenreList.map((genre, index) => (
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

export default TvFilter;
