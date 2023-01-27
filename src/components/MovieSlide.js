import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./MovieCard";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: hidden;
  margin: 0px 100px;
  overflow-y: hidden;
  z-index: 1;
  &:hover .btn {
    opacity: 1;
  }
  .btn {
    height: 180px;
    opacity: 0;
    color: #ecf0f1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    position: absolute;
    overflow: hidden;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
    transition: all ease 0.6s;
    .btn__icon {
      font-size: 23px;
    }
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
`;

const Slide = styled.div`
  transition: all ease 0.5s;
  display: flex;
`;

const Prev = styled.div`
  left: 3%;
`;

const Next = styled.div`
  right: 3%;
`;

const MovieSlide = ({ movies }) => {
  const [scrollX, setScrollX] = useState(0);
  const [count, setCount] = useState(0);
  const slideWidth = 1320;
  const cardWidth = 254;

  const handleBtnLeftClick = () => {
    setCount(0);
    let x = scrollX + slideWidth;
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleBtnRightClick = () => {
    if (count === 3) {
      return;
    }
    let x = scrollX - slideWidth;
    setCount((current) => current + 1);
    setScrollX(x);
  };
  return (
    <Wrapper>
      <Prev className="btn">
        <FontAwesomeIcon
          className="btn__icon"
          icon={faAngleLeft}
          onClick={handleBtnLeftClick}
        />
      </Prev>
      <Next className="btn">
        <FontAwesomeIcon
          className="btn__icon"
          icon={faAngleRight}
          onClick={handleBtnRightClick}
        />
      </Next>
      <Carousel style={{ height: 235 }}>
        <Slide
          style={{
            marginLeft: scrollX,
            width:
              movies.results.length * cardWidth +
              movies.results.length * 10 +
              100,
            height: 180,
          }}
        >
          {movies.results.length > 0 &&
            movies.results.map((item, index) => (
              <MovieCard key={index} movie={item} width={cardWidth} />
            ))}
        </Slide>
      </Carousel>
    </Wrapper>
  );
};

export default MovieSlide;
