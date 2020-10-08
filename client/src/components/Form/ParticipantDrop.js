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
    {props.participants.map((participant) => {
      return (
        <option
          key={participant._id}
          value={participant._id}
        >{`${participant.userFirstName} ${participant.userLastName}`}</option>
      );
    })}
  </select>
);

export default ParticipantDrop;
