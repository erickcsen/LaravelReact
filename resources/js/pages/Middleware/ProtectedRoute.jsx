import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("/auth/check", {
            withCredentials: true,
        })
        .then((response) => setAuthenticated(response.data.authenticated))
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return authenticated
        ? children
        : <Navigate to="/login" replace />;
}
