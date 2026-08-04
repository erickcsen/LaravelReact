import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Layouts/NavbarMenu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import api from "../api";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function ForgotPassword() {
    useEffect(() => {
        document.title = "Forgot Password";
    }, []);

    const logoWebsite =
        "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    const [form, setForm] = useState({
        email: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.get("/sanctum/csrf-cookie");
        try {
            const response = await api.post("/forgot-password", form);
            setShowToast(true);
            setErrors({});
            navigate("/login");
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
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="text-center mb-3">
                                    <img
                                        src={logoWebsite}
                                        width="60"
                                        height="60"
                                        alt="Logo Website"
                                    />
                                </div>
                                <h3 className="card-title text-center mb-4">Forgot Password</h3>
                                <form onSubmit={handleSubmit}>
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
                                        />
                                    </div>
                                    {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                                    &nbsp;
                                    <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={10000}
                    autohide
                    bg={errors.email || errors.message ? "danger" : "success"}
                >
                    <Toast.Header>
                        <strong className="me-auto">{errors.email || errors.message ? "Login Failed" : "Info"}</strong>
                    </Toast.Header>

                    <Toast.Body className="text-white">
                        {errors.email || errors.message ? errors.message : "Login successful."}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
