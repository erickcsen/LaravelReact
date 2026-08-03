import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("token"); // atau sessionStorage

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
