import React from "react";

export const Container = ({ fluid, children, customStyles }) => (
  <div className={`container${fluid ? "-fluid" : ""}`} style={customStyles}>
    {children}
  </div>
);
