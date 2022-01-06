import React from 'react';

export const SearchIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 17.25L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="7"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export const Forum = () => {
  return (
    <svg width="50" height="34" viewBox="0 0 50 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.2688 4.98219C28.6499 -1.66073 17.9169 -1.66073 11.298 4.98219L0.479631 15.8395C-0.159877 16.4821 -0.159877 17.5166 0.479631 18.1591L11.298 29.0165C17.9169 35.6594 28.6499 35.6594 35.2688 29.0274C41.8984 22.3953 41.8984 11.6251 35.2688 4.98219ZM32.7108 25.8366C27.8505 30.7153 19.9633 30.7153 15.103 25.8366L7.14117 17.8542C6.67219 17.3859 6.67219 16.6236 7.14117 16.1445L15.0924 8.17297C19.9526 3.29423 27.8399 3.29423 32.7001 8.17297C37.5711 13.0517 37.5711 20.9579 32.7108 25.8366Z" fill="#fff" />
      <path d="M49.4444 15.8503L44.6801 10.9825C44.3923 10.6884 43.9126 10.9607 44.0086 11.3636C44.8293 15.0771 44.8293 18.954 44.0086 22.6675C43.9233 23.0704 44.4029 23.3317 44.6801 23.0486L49.4444 18.1808C50.0732 17.5274 50.0732 16.4928 49.4444 15.8503Z" fill="#fff" />
      <path d="M23.9589 25.5426C28.568 25.5426 32.3044 21.7249 32.3044 17.0157C32.3044 12.3064 28.568 8.48877 23.9589 8.48877C19.3497 8.48877 15.6133 12.3064 15.6133 17.0157C15.6133 21.7249 19.3497 25.5426 23.9589 25.5426Z" fill="#fff" />
    </svg>
  );
};
