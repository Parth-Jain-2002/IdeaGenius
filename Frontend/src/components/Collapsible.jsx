import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import folderIcon from '../assets/images/folder_icon.png';

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
        className="collapsible-trigger flex items-center w-full cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-3"
        onClick={toggleCollapsible}
      > 
      { !chat && (
        <>
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
        </>
      )}
      { chat && (
        <>
        <Link to={`../research/${title}`} className="flex items-center">
        <img src={folderIcon} alt="Folder icon" className="h-4 w-4 mr-4" />
        {title}
        </Link>
        </>
        )
      }
        
      </div>
      {isOpen && (
        <div className="collapsible-content">
          <ul className="list-disc list-inside space-y-1">
            {
              !chat && (
                <>
                { title!= "Miscellaneous" &&
                <li key={1}><Link to={ `../vision-doc/${data}`}>Vision Doc</Link></li>
                }
                <li key={2}><Link to={ `../research/${data}`}>Research Bank</Link></li>
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
