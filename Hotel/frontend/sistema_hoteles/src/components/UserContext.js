import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Intenta cargar el usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    const userStored = localStorage.getItem('user');
    return userStored ? JSON.parse(userStored) : null;
  });

  // Escucha cambios en el estado del usuario para actualizar localStorage; revisat
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
