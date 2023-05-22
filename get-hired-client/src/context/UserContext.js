import { createContext, useState, useEffect } from 'react';
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'guest' });
  useEffect(() => {
    async function fetchData() {
      const r = await fetch('http://127.0.0.1:3001/user_name', {
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (r.status === 200) {
        const d = await r.json();
        const user_name = d["user_name"]
        console.log(user_name)
        setUser({ ...user, username: user_name })
        //console.log(d)
      }
    }
    fetchData();
  }, []);

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
