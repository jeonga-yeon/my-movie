import React from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .spinner {
    margin-top: 200px;
  }
`;

const Loading = ({ loading }) => {
  return (
    <Wrapper>
      <ClipLoader
        className="spinner"
        color="white"
        loading={loading}
        size={150}
      />
    </Wrapper>
  );
};

export default Loading;
