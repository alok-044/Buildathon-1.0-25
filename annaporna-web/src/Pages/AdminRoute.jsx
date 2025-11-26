
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-brand-green" />
      </div>
    );
  }
  if (isAuthenticated && user?.role === 'admin') {
    return <Outlet />;
  }

  if (isAuthenticated && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default AdminRoute;