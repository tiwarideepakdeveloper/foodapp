import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login"></Navigate>

};

export default ProtectedRoute;