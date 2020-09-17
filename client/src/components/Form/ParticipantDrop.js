import React from "react";

const dropdownStyles = {
  fontSize: "1.5rem",
  top: "3.0rem",
  width: "100%",
  marginBottom: "1.5rem",
  padding: "0.8rem 0.9rem",
  border: "0.1rem solid #cccccc",
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
