import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchProfile } from '../hooks/useFetchProfile';

// --- USER PROTECTED ROUTE ---
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('access_token');
  const fetchProfile = useFetchProfile();

  useEffect(() => {
    if (token && token !== "undefined" && token !== "null" && token !== "") {
      fetchProfile();
    }
  }, [token]);

  if (!token || token === "undefined" || token === "null" || token === "") {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data'); 

    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export const ProtectedRouteAdmin = ({ children }) => {
  const adminToken = localStorage.getItem('admin_token');
  const adminRawData = localStorage.getItem('admin_data');

  if (!adminToken || adminToken === "undefined" || !adminRawData) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    return <Navigate to="/admin-login" replace />;
  }

  try {
    const adminData = JSON.parse(adminRawData);

    if (adminData?.role?.toUpperCase() !== 'ADMIN' && adminData?.role?.toLowerCase() !== 'admin') {
      return <Navigate to="/" replace />; 
    }
  } catch (error) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    return <Navigate to="/admin-login" replace />;
  }

  return children ? children : <Outlet />;
};