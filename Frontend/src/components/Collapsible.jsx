import React, { useState } from 'react';

const Collapsible = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <div
        className="collapsible-trigger flex items-center w-full cursor-pointer"
        onClick={toggleCollapsible}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'} mr-2`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {title}
      </div>
      {isOpen && (
        <div className="collapsible-content">
          <ul className="list-disc list-inside space-y-1">
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
