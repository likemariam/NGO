import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const saved  = localStorage.getItem('user');
    if (token && saved) {
      try { setUser(JSON.parse(saved)); } catch { /* corrupt */ }
    }
    setLoading(false);
  }, []);

  /**
   * authService.login resolves to the envelope:
   *   { success, message, data: { token, type, userId, email, firstName, lastName, role } }
   */
  const login = async (credentials) => {
    const envelope = await authService.login(credentials);
    const authData  = envelope?.data ?? envelope; // unwrap once more in case interceptor skipped
    const { token, ...userInfo } = authData;
    localStorage.setItem('token', token);
    localStorage.setItem('user',  JSON.stringify(userInfo));
    setUser(userInfo);
    return userInfo;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
