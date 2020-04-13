import React from "react";

export const Row = ({ fluid, children, customStyles }) => (
  <div className={`row${fluid ? "-fluid" : ""}`} style={customStyles}>
    {children}
  </div>
);
