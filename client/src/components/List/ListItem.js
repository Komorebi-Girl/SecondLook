import React from "react";

export const ListItem = props => (
  <li className="list-group-item" style={{ textAlign: "center" }}>
    {props.children}
  </li>
);
