import Navbar from "./Layouts/NavbarMenu";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const logoWebsite =
        "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";

    useEffect(() => {
        document.title = "Reset Password";
    }, []);

    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    const [form, setForm] = useState({
        email: email || "",
        password: "",
        password_confirmation: "",
        token: token || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.get("/sanctum/csrf-cookie");
        try {
            const response = await api.post("/reset-password", form);
            setShowToast(true);
            setErrors({});
            // navigate("/login");
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            setShowToast(true);
            if (error.response?.status === 422) {
                console.log(error.response.data.errors);
                error.response.data.errors.message = error.response.data.message;
                setErrors(error.response.data.errors);
            } else {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5} xl={4}>
                        <div className="border rounded p-4 shadow-sm">
                            <div className="text-center mb-3">
                                <img
                                    src={logoWebsite}
                                    width="60"
                                    height="60"
                                    alt="Logo Website"
                                />
                            </div>
                            <h3 className="text-center mb-4">Reset Password</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value={csrfToken} />
                                <input type="hidden" name="token" value={form.token} />
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        readOnly
                                    />
                                </div>
                                {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                                &nbsp;
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa fa-key"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Enter your new password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                </div>
                                {errors.password && <div className="text-danger">{errors.password[0]}</div>}
                                &nbsp;
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa fa-key"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                        id="password_confirmation"
                                        placeholder="Confirm your new password"
                                        value={form.password_confirmation}
                                        onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                                    />
                                </div>
                                {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation[0]}</div>}
                                &nbsp;
                                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
