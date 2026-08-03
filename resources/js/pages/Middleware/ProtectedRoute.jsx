import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

import Navbar from '../Layouts/NavbarMenu';
import { OrbitProgress, Commet, Atom } from "react-loading-indicators";

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

    if (loading)
        return <>
            <Navbar/>
            <h1 className="text-center" style={{marginTop:"20vh"}}>
                <Atom color="#ffac00" size="large" text="Loading" textColor="" /> <br />
            </h1>
        </>

    window.AppData = {
        user: user,
    };

    return authenticated
        ? children
        : <Navigate to="/login" replace />;
}
