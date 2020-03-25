import React from "react";

const AssignDropdown = props => (
  <select onChange={event => props.assignReviewer(event, props.tbID)}>
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
