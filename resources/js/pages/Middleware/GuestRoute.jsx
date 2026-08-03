import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

export default function GuestRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        api.get("/auth/check", {
            withCredentials: true,
        })
        .then((response) => setAuthenticated(response.data.authenticated))
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return authenticated
        ? <Navigate to="/" replace />
        : children;
}
