import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    children: ReactNode;
}

interface JwtPayload {
    exp?: number; // expiration time in seconds since epoch
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            // Token expired
            localStorage.removeItem("token"); // optional: remove expired token
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        // Invalid token
        localStorage.removeItem("token");
        console.log(error);
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
