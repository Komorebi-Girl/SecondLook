import React from "react";

export const FormBtn = (props) => (
  <button {...props} style={props.customStyles} className="btn btn-success">
    {props.children}
  </button>
);
