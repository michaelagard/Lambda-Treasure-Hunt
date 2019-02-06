import React from "react";
import styled from "styled-components";

const ConsoleWrapper = styled.div`
  width: 80%;
  border: 5px solid black;
  padding: 8px;
`;

const Console = props => {
  return <ConsoleWrapper>{props.data}</ConsoleWrapper>;
};

export default Console;
