import React from "react";
import styled from "styled-components";

const ControlsWrapper = styled.div`
  width: 18%;
  border: 5px solid black;
`;

const Controls = props => {
  return (
    <ControlsWrapper>
      <button onClick={props.onClick}>Add Data to Console</button>
    </ControlsWrapper>
  );
};

export default Controls;
