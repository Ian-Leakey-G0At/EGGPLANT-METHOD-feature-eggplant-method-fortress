import React from 'react';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#84CC16" />
    <path
      d="M7 8H17"
      stroke="#F0F0F0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7 12H17"
      stroke="#F0F0F0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7 16H17"
      stroke="#F0F0F0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default LogoIcon;
