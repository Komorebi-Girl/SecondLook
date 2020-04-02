import React from "react";

const dropdownStyles = {
  fontSize: "1.8rem",
  position: "relative",
  top: "30px"
};

const AssignDropdown = props => (
  <select
    style={dropdownStyles}
    onChange={event => props.assignReviewer(event, props.tbID)}
  >
    <option selected value="default">
      Select Reviewer:
    </option>
    {props.users.map(user => {
      return (
        <option
          key={user._id}
          value={user._id}
        >{`${user.userFirstName} ${user.userLastName}`}</option>
      );
    })}
  </select>
);

export default AssignDropdown;
