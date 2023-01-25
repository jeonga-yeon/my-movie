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
  .movie__header {
    display: flex;
    padding: 25px;
    img {
      width: 60px;
      height: 90px;
      z-index: 1;
    }
    .movie__title {
      margin-left: 20px;
      width: 45%;
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
  .movie__genres {
    padding-left: 25px;
    width: 50%;
    position: absolute;
    top: 150px;
    .movie__genre {
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
  .movie__overview {
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
  .movie__info {
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

const MoviePageCard = ({ movie }) => {
  const { movieGenreList, loading } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  if (loading) return <Loading loading={loading} />;
  return (
    <Wrapper
      onClick={() => navigate(`/movies/${movie.id}`)}
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/original${movie.backdrop_path}` +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div className="movie__header">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
        <div className="movie__title">
          <h1>{movie.title}</h1>
          <span>{movie.release_date}</span>
        </div>
      </div>
      <div className="movie__genres">
        {movie.genre_ids.map((id, index) => (
          <span className="movie__genre" key={index}>
            {movieGenreList.find((item) => item.id === id).name}
          </span>
        ))}
      </div>
      <div className="movie__overview">{movie.overview}</div>
      <div className="movie__info">
        <span>
          <FontAwesomeIcon icon={faStar} className="vote-average" />
          {movie.vote_average}
        </span>
        <span>
          <FontAwesomeIcon icon={faUsers} className="popularity" />
          {movie.popularity}
        </span>
        {movie.adult ? (
          <div className="adult">
            <span>18</span>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default MoviePageCard;
