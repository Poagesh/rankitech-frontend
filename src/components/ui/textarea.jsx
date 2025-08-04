import React from "react";

export const Textarea = ({ className = "", ...props }) => (
  <textarea className={`border rounded-xl px-3 py-2 text-sm w-full ${className}`} {...props} />
);
