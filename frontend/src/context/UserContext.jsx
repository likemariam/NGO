import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
}
