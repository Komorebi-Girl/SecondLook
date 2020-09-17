import React from "react";

const dropdownStyles = {
  fontSize: "1.8rem",
  top: "3.0rem",
  width: "100%",
  marginBottom: "1.5rem",
};

const ParticipantDrop = (props) => (
  <select
    style={dropdownStyles}
    onChange={(event) => props.assignParticipant(event)}
  >
    <option selected value="default">
      Select Your Participant:
    </option>
    {props.users.map((user) => {
      return (
        <option
          key={user._id}
          value={user._id}
        >{`${user.userFirstName} ${user.userLastName}`}</option>
      );
    })}
  </select>
);

export default ParticipantDrop;
