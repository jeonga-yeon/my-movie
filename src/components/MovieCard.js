import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  margin-right: 10px;
  border-radius: 1%;
  .overlay {
    transition: all ease-in-out 0.5s;
    position: relative;
    box-sizing: border-box;
    padding: 5%;
    opacity: 0;
    background: rgba(43, 41, 41, 0.9);
    h1 {
      margin: 0px;
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 600;
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
      display: flex;
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
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const MovieCard = ({ movie, width }) => {
  const navigate = useNavigate();
  const { movieGenreList } = useSelector((state) => state.movies);
  return (
    <Wrapper
      onClick={() => navigate(`/my-movie/movies/${movie.id}`)}
      style={{
        height: width * 0.7,
        width,
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path}` +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100%", width }} className="overlay">
        <h1>{movie.title}</h1>
        <div className="overlay__genres">
          {movie.genre_ids.map((id, index) => (
            <span className="overlay__genre" key={index}>
              {movieGenreList.find((item) => item.id === id).name}
            </span>
          ))}
        </div>
        <div className="overlay__info">
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
      </div>
    </Wrapper>
  );
};

export default MovieCard;
