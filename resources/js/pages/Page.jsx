import { Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/NavbarMenu";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import NotFound from "./NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProtectedRoute from "./Middleware/ProtectedRoute";
import GuestRoute from "./Middleware/GuestRoute";

export default function Page() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Dashboard />
                } />
                <Route path="/login" element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                } />
                <Route path="/register" element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                } />
                <Route path="/forgot-password" element={
                    <GuestRoute>
                        <ForgotPassword />
                    </GuestRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
