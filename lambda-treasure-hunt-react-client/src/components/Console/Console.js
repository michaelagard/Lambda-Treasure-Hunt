import React from "react";
import styled from "styled-components";

const ConsoleWrapper = styled.div`
  width: 80%;
  border: 5px solid black;
  padding: 8px;
  font-family: Andale Mono, AndaleMono, monospace;
  overflow: hidden;
`;

const Message = styled.li`
  /* font-size: 1px; */
`;

const Console = props => {
  return (
    <ConsoleWrapper>
      {props.data.map(item => (
        <Message key={item + Math.random()}>{item}</Message>
      ))}
    </ConsoleWrapper>
  );
};

export default Console;
