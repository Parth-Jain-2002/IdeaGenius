import React, { useContext, useState, useEffect } from "react";

/**
 * A context that lets Sidebar and Navbar communicate with each other.
 */
const NavContext = React.createContext();

/**
 * A hook to access the NavContext
 * @returns {Object} The NavContext
 */
export function useNav() {
  return useContext(NavContext);
}

/**
 * A component to wrap the application and provide the NavContext
 * @param {Object} children The child components of the application
 * @returns {Object} The NavContext provider
 */
export default function NavProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <NavContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </NavContext.Provider>
  );
}