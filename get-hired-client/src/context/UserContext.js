import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'guest' });


  const updateUsername = (newUsername) => {
    // Update the username in the user object
    setUser({ ...user, username: newUsername });
  };

  const userContextValue = {
    user,
    updateUsername,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
