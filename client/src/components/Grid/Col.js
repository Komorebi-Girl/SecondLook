import React from "react";

export const Col = ({ size, children, customStyles }) => (
  <div
    className={` ${customStyles} ${size
      .split(" ")
      .map(size => "col-" + size)
      .join(" ")}`}
  >
    {children}
  </div>
);
