import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute({ user, redirectPath="/dashboard", children }) {
    if (user) {
        return <Navigate to={redirectPath} replace/>
    }
    
      return children ? children : <Outlet />;
}

export default AuthRoute;