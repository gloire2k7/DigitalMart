import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Check if user has at least one of the allowed roles
    const userHasAllowedRole = user.roles.some((role: string) => allowedRoles.includes(role));
    if (!userHasAllowedRole) {
      // User does not have an allowed role, redirect to unauthorized page or a default dashboard
      // For now, let's redirect to home, you can change this to a dedicated unauthorized page
      console.warn('User does not have the required role(s): ', allowedRoles);
      return <Navigate to="/home" replace />;
    }
  }

  // User is authenticated and has the required role(s)
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 