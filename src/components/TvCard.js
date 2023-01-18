import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin-right: 10px;
  border-radius: 1%;
  &:hover {
    scale: 1.3;
  }
  .overlay {
    position: relative;
    box-sizing: border-box;
    padding: 5%;
    opacity: 0;
    background: rgba(43, 41, 41, 0.9);
    h1 {
      margin: 0px;
      margin-bottom: 10px;
    }
    .overlay__genre {
      margin-right: 5px;
      background-color: red;
      display: inline-block;
      font-size: 12px;
      padding: 3px;
      border-radius: 3px;
      font-weight: 600;
    }
    .overlay__info {
      position: absolute;
      bottom: 7%;
      .vote-average {
        color: yellow;
        margin-right: 3px;
      }
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const TvCard = ({ tvShow, width }) => {
  const { tvGenreList } = useSelector((state) => state.tvShows);
  return (
    <Wrapper
      style={{
        height: "100%",
        width,
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${tvShow.poster_path}` +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100%", width }} className="overlay">
        <h1>{tvShow.name}</h1>
        <div className="overlay__genres">
          {tvShow.genre_ids.map((id, index) => (
            <span className="overlay__genre" key={index}>
              {tvGenreList.find((item) => item.id === id).name}
            </span>
          ))}
        </div>
        <div className="overlay__info">
          <span>
            <FontAwesomeIcon icon={faStar} className="vote-average" />
            {tvShow.vote_average}
          </span>
          <span>{tvShow.adult ? "18" : null}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default TvCard;
