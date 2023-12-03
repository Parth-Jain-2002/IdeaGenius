import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import folderIcon from '../assets/images/folder_icon.png';
import researchIcon from '../assets/images/research_bank_icon.png';
import visionDocIcon from '../assets/images/vision_doc_icon.png';

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
        className="collapsible-trigger flex items-center w-full cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-3 text-white"
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
        <div className="collapsible-content text-white">
          <ul className="list-none list-inside text-left ml-3 space-y-2">
            {
              !chat && (
                <>
                { title!= "Miscellaneous" &&
                <li key={1}><Link to={ `../vision-doc/${data}`}>
                  <div className='flex flex-row'>
                  <img src={visionDocIcon} alt="Vision doc icon" className="h-4 w-4 mr-2 mt-1" />
                  Vision Doc
                  </div>
                  </Link></li>
                }
                <li key={2}><Link to={ `../research/${data}`}>
                  <div className='flex flex-row'>
                  <img src={researchIcon} alt="Research bank icon" className="h-4 w-4 mr-2 mt-1" />
                  Research Bank
                  </div>
                  </Link></li>
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
