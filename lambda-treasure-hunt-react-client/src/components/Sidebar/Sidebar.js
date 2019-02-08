import React from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 18%;
  border: 5px solid black;
`;

const Sidebar = props => {
  return (
    <SidebarWrapper>
      <h2>Player Information</h2>
      <ul>
        <li>Name: {props.status["name"]}</li>
        <li>Cooldown: {props.status["cooldown"]}</li>
        <li>Gold: {props.status["gold"]}</li>
        <li>Inventory: {props.status["inventory"]}</li>
        <li>Encumberance: {props.status["encumbrance"]}</li>
        <li>Speed: {props.status["speed"]}</li>
        <li>Strength: {props.status["strength"]}</li>
        <li>Status: {props.status["status"]}</li>
      </ul>
      <hr />
      <h2>Room Information</h2>
      <ul>
        <li>Cooldown: {props.room.cooldown}</li>
        <li>Coordinates: {props.room.coordinates}</li>
        {/* <li>Description: {props.room.description}</li> */}
        <li>Elevation: {props.room.elevation}</li>
        <li>Exits: {props.room.exits}</li>
        {props.room.items === "" ? <li>Items: {props.room.items}</li> : ""}
        <li>Messages: {props.room.messages}</li>
        <li>Players: {props.room.players}</li>
        <li>Room ID: {props.room.room_id}</li>
        <li>Terrain: {props.room.terrain}</li>
        <li>Title: {props.room.title}</li>
        {props.room.errors === "" ? <li>Errors: {props.room.errors}</li> : ""}
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
