import React from "react";

export const Button = ({ children, onClick, type = "button", className = "", variant = "default", disabled = false }) => {
  const base = "rounded-xl px-4 py-2 text-sm font-medium focus:outline-none transition";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
