import React from "react";

// export const FormBtn = ({ children, customStyles }) => (
//   <button style={customStyles} className="btn btn-success">
//     {children}
//   </button>
// );

export const FormBtn = (props) => (
  <button {...props} style={props.customStyles} className="btn btn-success">
    {props.children}
  </button>
);
