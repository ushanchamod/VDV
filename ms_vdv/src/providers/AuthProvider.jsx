
import React, { createContext, useContext, useState } from 'react';

const AuthProvider = createContext();

export const MyAuthProvider = ({ children }) => {
  const [authData, setMyData] = useState(null);

  const updateAuth = newData => {
    setMyData(newData);
  };

  return (
    <AuthProvider.Provider value={{ authData, updateAuth }}>
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthProvider);
};
