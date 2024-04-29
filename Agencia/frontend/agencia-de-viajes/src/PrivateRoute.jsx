import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children }) => {
    const { user, isUserLoading } = useUser();
    let location = useLocation();

    if (isUserLoading) {
        
        return null; 
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
export default PrivateRoute;
