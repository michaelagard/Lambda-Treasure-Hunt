import React from "react";
import styled from "styled-components";
const Controls = props => {
  return (
    <ControlsWrapper>
      <button onClick={props.checkInventory}>Inventory</button>
      <Directions>
        <TopDirection>
          <button onClick={props.moveUp}>/\</button>
        </TopDirection>
        <BottomDirections>
          <button onClick={props.moveLeft}>{"<"}</button>
          <button onClick={props.moveDown}>\/</button>
          <button onClick={props.moveRight}>></button>
        </BottomDirections>
      </Directions>
    </ControlsWrapper>
  );
};
const ControlsWrapper = styled.div`
  width: 18%;
  border: 5px solid black;
`;

const Directions = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  height: 100%;
  justify-content: center;
`;

const TopDirection = styled.div`
  display: flex;
  justify-content: center;
`;

const BottomDirections = styled.div`
  display: flex;
  justify-content: center;
`;
export default Controls;
