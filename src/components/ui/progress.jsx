import React from "react";

export const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="bg-blue-600 h-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);
