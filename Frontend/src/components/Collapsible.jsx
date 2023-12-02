import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Collapsible = ({ title, data, chat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const parseTitle = (title) => {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
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
            { chat && (
              <>
              {data.map((item, index) => (
                <li key={index}><Link to={ `../chat/${item.chatid}`}>{parseTitle(item.title)}</Link></li>
              ))}
              </>
            )}
            {
              !chat && (
                <>
                { title!= "Miscellaneous" &&
                <li key={1}><Link to={ `../vision-doc/${data}`}>Vision Doc</Link></li>
                }
                <li key={2}><Link to={ `../research-bank/${data}`}>Research Bank</Link></li>
                </>
              )
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
