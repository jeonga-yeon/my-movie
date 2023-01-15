import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 800px;
  display: flex;
  align-items: center;
  .banner-info {
    width: 70%;
    margin-left: 100px;
    h1 {
      margin-top: 100px;
      font-size: 60px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    p {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

const Banner = ({ movie }) => {
  return (
    <Wrapper
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}` +
          ")",
      }}
    >
      <div className="banner-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </Wrapper>
  );
};

export default Banner;
