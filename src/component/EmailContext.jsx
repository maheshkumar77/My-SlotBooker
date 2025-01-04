// src/context/EmailContext.js

import  { createContext, useState, useContext } from 'react';

// Create a context to store the email
const EmailContext = createContext();

// Custom hook to use the EmailContext
export const useEmail = () => {
  return useContext(EmailContext);
};

// EmailProvider component that will wrap your app
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null); // State to store email

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <EmailContext.Provider value={{ email, updateEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
