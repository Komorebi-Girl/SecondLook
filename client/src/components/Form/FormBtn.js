import React from "react";

export const FormBtn = ({ children, customStyles }) => (
  <button style={customStyles} className="btn btn-success">
    {children}
  </button>
);
