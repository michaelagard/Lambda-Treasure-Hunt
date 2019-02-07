import React from "react";
import styled from "styled-components";

const ConsoleWrapper = styled.div`
  width: 80%;
  border: 5px solid black;
  padding: 8px;
  font-family: Andale Mono, AndaleMono, monospace;
  overflow: hidden;
`;

const Console = props => {
  return (
    <ConsoleWrapper>
      {props.data.map(item => (
        <li key={item + Math.random()}>{item}</li>
      ))}
    </ConsoleWrapper>
  );
};

export default Console;
