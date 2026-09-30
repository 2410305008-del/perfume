import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('yourscent_token') || null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session from stored token on mount
  useEffect(() => {
    if (token) {
      api.getMe(token)
        .then(res => {
          if (res.success) {
            setUser(res.user);
          } else {
            // Token expired / invalid
            localStorage.removeItem('yourscent_token');
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('yourscent_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('yourscent_token', res.token);
    }
    return res;
  };

  const register = async (name, email, password, phone) => {
    const res = await api.register({ name, email, password, phone });
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('yourscent_token', res.token);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('yourscent_token');
  };

  const isAuthenticated = !!user;

  // Initials for avatar
  const initials = user
    ? user.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        initials,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
