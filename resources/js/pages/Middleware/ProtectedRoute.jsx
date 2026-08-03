import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/auth/check", {
            withCredentials: true,
        })
        .then((response) => {
            setAuthenticated(response.data.authenticated);
            setUser(response.data.user);
        })
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    window.AppData = {
        user: user,
    };

    return authenticated
        ? children
        : <Navigate to="/login" replace />;
}
