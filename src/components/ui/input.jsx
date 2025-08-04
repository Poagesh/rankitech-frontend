import React from "react";

export const Input = ({ className = "", ...props }) => (
  <input className={`border rounded-xl px-3 py-2 text-sm w-full ${className}`} {...props} />
);
