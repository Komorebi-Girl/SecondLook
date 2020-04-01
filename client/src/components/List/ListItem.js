import React from "react";

export const ListItem = props => (
  <li
    className="list-group-item"
    style={{ textAlign: "center", marginTop: "3%" }}
  >
    {props.children}
  </li>
);
