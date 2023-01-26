/* eslint-disable jsx-a11y/alt-text */
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.div`
  height: 550px;
  border-radius: 20px;
  position: relative;
  box-shadow: 12px 12px 10px 10px rgba(192, 57, 43, 0.3);
  &:hover {
    cursor: pointer;
  }
  &::before {
    position: absolute;
    left: 0;
    width: 100%;
    height: 550px;
    content: "";
    background: linear-gradient(to right, black 50%, transparent);
  }
  .tv__header {
    display: flex;
    padding: 25px;
    img {
      width: 60px;
      height: 90px;
      z-index: 1;
    }
    .tv__title {
      margin-left: 20px;
      width: 60%;
      z-index: 1;
      h1 {
        font-size: 30px;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 10px;
      }
      span {
        font-size: 13px;
        color: skyblue;
      }
    }
  }
  .tv__genres {
    padding-left: 25px;
    width: 50%;
    position: absolute;
    top: 150px;
    .tv__genre {
      margin-right: 10px;
      background-color: #dc143d;
      display: inline-block;
      font-size: 12px;
      padding: 7px;
      border-radius: 10px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  .tv__overview {
    padding-left: 25px;
    position: absolute;
    top: 250px;
    width: 50%;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #bdc3c7;
    line-height: 20px;
    font-size: 16px;
  }
  .tv__info {
    position: absolute;
    bottom: 7%;
    display: flex;
    padding-left: 25px;
    align-items: center;
    .vote-average {
      color: yellow;
      margin-right: 3px;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
    .popularity {
      color: #bdc3c7;
      margin-right: 3px;
    }
    .adult {
      color: black;
      font-weight: 600;
      height: 18px;
      width: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      background-color: red;
      border-radius: 10%;
    }
  }
`;

const TvPageCard = ({ tvShow }) => {
  const { tvGenreList, loading } = useSelector((state) => state.tvShows);
  const navigate = useNavigate();
  if (loading) return <Loading loading={loading} />;
  return (
    <Wrapper
      onClick={() => navigate(`/tvshows/${tvShow.id}`)}
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}` +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div className="tv__header">
        <img src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`} />
        <div className="tv__title">
          <h1>{tvShow.name}</h1>
          <span>{tvShow.first_air_date}</span>
        </div>
      </div>
      <div className="tv__genres">
        {tvShow.genre_ids.map((id, index) => (
          <span className="tv__genre" key={index}>
            {tvGenreList.find((item) => item.id === id).name}
          </span>
        ))}
      </div>
      <div className="tv__overview">{tvShow.overview}</div>
      <div className="tv__info">
        <span>
          <FontAwesomeIcon icon={faStar} className="vote-average" />
          {tvShow.vote_average}
        </span>
        <span>
          <FontAwesomeIcon icon={faUsers} className="popularity" />
          {tvShow.popularity}
        </span>
        {tvShow.adult ? (
          <div className="adult">
            <span>18</span>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default TvPageCard;
