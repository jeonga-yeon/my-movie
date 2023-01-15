import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 10px;
`;

const MovieCard = ({ movie, width }) => {
  return (
    <Wrapper
      style={{
        height: "100%",
        width,
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path}` +
          ")",
        backgroundSize: "cover",
      }}
    ></Wrapper>
  );
};

export default MovieCard;
