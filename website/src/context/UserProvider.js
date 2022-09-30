import React, { useState } from 'react';

const User = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    phoneCountry: 'UnitedStates',
    phoneNumber: '',
  });

  return (
    <User.Provider value={{ user, setUser }}>
      {children}
    </User.Provider>
  );
};

export const useUser = () => React.useContext(User);
