import React from "react";

const Dropdown = props => (
  <select
    onChange={event => props.updateScores(event.target.value, props.index)}
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
