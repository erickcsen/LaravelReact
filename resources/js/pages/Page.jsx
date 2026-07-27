import { Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/NavbarMenu";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}
