import React from "react";

export const Row = ({ fluid, children, customStyle }) => (
  <div style={customStyle} className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
