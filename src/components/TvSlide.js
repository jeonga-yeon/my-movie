import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TvCard from "./TvCard";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  margin: 0px 100px;
  overflow-y: hidden;
  z-index: 1;
  .btn {
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
  left: 0;
`;

const Next = styled.div`
  right: 0;
`;

const TvSlide = ({ tvShows }) => {
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
      <Prev className="btn" style={{ height: cardWidth * 0.7 }}>
        <FontAwesomeIcon
          className="btn__icon"
          icon={faAngleLeft}
          onClick={handleBtnLeftClick}
        />
      </Prev>
      <Next className="btn" style={{ height: cardWidth * 0.7 }}>
        <FontAwesomeIcon
          className="btn__icon"
          icon={faAngleRight}
          onClick={handleBtnRightClick}
        />
      </Next>
      <Carousel style={{ height: cardWidth * 0.7 + 20 }}>
        <Slide
          style={{
            marginLeft: scrollX,
            width:
              tvShows.results.length * cardWidth +
              tvShows.results.length * 10 +
              100,
            height: cardWidth * 0.7,
          }}
        >
          {tvShows.results.length > 0 &&
            tvShows.results.map((item, index) => (
              <TvCard key={index} tvShow={item} width={cardWidth} />
            ))}
        </Slide>
      </Carousel>
    </Wrapper>
  );
};

export default TvSlide;
