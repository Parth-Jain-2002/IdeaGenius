import React, { useContext, useState } from "react";

/**
 * A context that lets Sidebar open NewIdeaModal
 */
const NewIdeaModalContext = React.createContext();

/**
 * A hook to access the NewIdeaModalContext
 * @returns {Object} The NewIdeaModalContext
 */
export function useNewIdeaModal() {
  return useContext(NewIdeaModalContext);
}

/**
 * A component to wrap the application and provide the NewIdeaModalContext
 * @param {Object} children The child components of the application
 * @returns {Object} The NewIdeaModalContext provider
 */
export default function NewIdeaModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <NewIdeaModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </NewIdeaModalContext.Provider>
  );
}