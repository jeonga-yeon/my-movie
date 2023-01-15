import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  overflow-x: hidden;
  margin: 0px 100px;
  margin-top: 20px;
  &:hover {
    .btn {
      opacity: 1;
    }
  }
  z-index: 1;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 235px;
    position: absolute;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    transition: all ease 0.6s;
  }
`;

const Carousel = styled.div`
  height: 170px;
`;

const Slide = styled.div`
  height: 150px;
  transition: all ease 0.5s;
  display: flex;
`;

const Prev = styled.div`
  left: 0;
`;

const Next = styled.div`
  right: 0;
`;

const MovieSlide = ({ movies }) => {
  const [scrollX, setScrollX] = useState(0);
  const [count, setCount] = useState(0);
  const slideWidth = window.innerWidth - 260;
  const cardWidth = slideWidth / 5;

  const handleBtnLeftClick = (e) => {
    setCount(0);
    let x = scrollX + slideWidth + 50;
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleBtnRightClick = (e) => {
    if (count === 3) {
      return;
    }
    let x = scrollX - slideWidth - 50;
    setCount((current) => current + 1);
    setScrollX(x);
  };
  return (
    <Wrapper>
      <Prev className="btn">
        <FontAwesomeIcon icon={faAngleLeft} onClick={handleBtnLeftClick} />
      </Prev>
      <Next className="btn">
        <FontAwesomeIcon icon={faAngleRight} onClick={handleBtnRightClick} />
      </Next>
      <Carousel>
        <Slide
          style={{
            marginLeft: scrollX,
            width:
              movies.results.length * cardWidth +
              movies.results.length * 10 +
              100,
          }}
        >
          {movies.results.length > 0 &&
            movies.results.map((movie, index) => (
              <MovieCard key={index} movie={movie} width={cardWidth} />
            ))}
        </Slide>
      </Carousel>
    </Wrapper>
  );
};

export default MovieSlide;
