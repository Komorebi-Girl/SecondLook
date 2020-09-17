import React from "react";

const Dropdown = (props) => (
  <select
    onChange={(event) => props.updateScores(event.target.value, props.index)}
    style={{ width: "100%" }}
  >
    <option selected value={props.category}>
      {`Select ${props.category} Score`}:
    </option>
    <option value="Weak">Weak</option>
    <option value="Average">Average</option>
    <option value="Strong">Strong</option>
    <option value="Exemplary">Exemplary</option>
  </select>
);

export default Dropdown;
