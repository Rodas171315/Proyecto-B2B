// En PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (!user || user.rol !== '1') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
