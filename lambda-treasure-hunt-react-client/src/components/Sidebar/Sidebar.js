import React, { Component } from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 18%;
  border: 5px solid black;
`;

class Sidebar extends Component {
  render() {
    return <SidebarWrapper>Sidebar</SidebarWrapper>;
  }
}

export default Sidebar;