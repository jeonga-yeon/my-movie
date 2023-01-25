import React from "react";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  width: 300px;
  border: 2px solid white;
  border-radius: 30px;
`;

const BeforeClick = styled.div`
  box-sizing: border-box;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  .arrow:hover {
    cursor: pointer;
  }
`;

const AfterClick = styled.div`
  box-sizing: border-box;
  height: 100px;
  border-top: 2px solid white;
`;

const Filter = () => {
  const [click, setClick] = useState(false);
  return (
    <Wrapper>
      <BeforeClick>
        <span>Filter</span>
        {click ? (
          <FontAwesomeIcon
            icon={faArrowDown}
            onClick={() => setClick(false)}
            className="arrow"
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={() => setClick(true)}
            className="arrow"
          />
        )}
      </BeforeClick>
      {click ? <AfterClick></AfterClick> : null}
    </Wrapper>
  );
};

export default Filter;
