import React from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 18%;
  border: 5px solid black;
`;

const Sidebar = props => {
  return (
    <SidebarWrapper>
      <ul>
        <li>Name: {props.statusState["name"]}</li>
        <li>Cooldown: {props.statusState["cooldown"]}</li>
        <li>Gold: {props.statusState["gold"]}</li>
        <li>Inventory: {props.statusState["inventory"]}</li>
        <li>Encumberance: {props.statusState["encumbrance"]}</li>
        <li>Speed: {props.statusState["speed"]}</li>
        <li>Strength: {props.statusState["strength"]}</li>
        <li>Status: {props.statusState["status"]}</li>
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
