import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 10px;
  .overlay {
    opacity: 0;
    background: rgba(43, 41, 41, 0.9);
    h1 {
      margin: 0px;
    }
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
        <h1>{tvShow.title}</h1>
        <div>
          {tvShow.genre_ids.map((id, index) => (
            <span key={index}>
              {tvGenreList.find((item) => item.id === id).name}
            </span>
          ))}
        </div>
        <div>
          <span>{tvShow.vote_average}</span>
          <span>{tvShow.adult ? "청불" : null}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default TvCard;
