// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    let location = useLocation();

    if (!user) {
       
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
 export default PrivateRoute;