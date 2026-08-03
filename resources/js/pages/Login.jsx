import { useState } from "react";
import Navbar from "./Layouts/NavbarMenu";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import api from "../api";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Login() {
    useEffect(() => {
        document.title = "Login";
    }, []);

    const logoWebsite =
        "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";
    const websiteName = "Blogger";

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.get("/sanctum/csrf-cookie");
        try {
            const response = await api.post("/signIn", form);
            setShowToast(true);
            setErrors({});
            navigate("/");
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
    };

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

                            <h3 className="text-center mb-4">
                                Login
                            </h3>

                            <Form method="POST" onSubmit={handleSubmit}>
                                {/* Email */}
                                <input type="hidden" name="_token" value={csrfToken} />
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa fa-envelope"></i>
                                        </span>

                                        <Form.Control
                                            type="email"
                                            placeholder="Input Email"
                                            isInvalid={!!errors.email}
                                            value={form.email}
                                            onChange={(e) => setForm({...form, email: e.target.value})}
                                        />
                                    </div>
                                    {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                                </Form.Group>

                                {/* Password */}
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa fa-key"></i>
                                        </span>

                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Input Password"
                                            isInvalid={!!errors.password}
                                            value={form.password}
                                            onChange={(e) => setForm({...form, password: e.target.value})}
                                        />

                                        <Button
                                            className="border"
                                            variant="light"
                                            onClick={handleShowPassword}
                                        >
                                            <i
                                                className={
                                                    showPassword
                                                        ? "fa fa-eye-slash"
                                                        : "fa fa-eye"
                                                }
                                            ></i>
                                        </Button>
                                    </div>
                                    {errors.password && <div className="text-danger float-start">{errors.password[0]}</div>}
                                    <Link to="/forgot-password" className="float-end mb-3">
                                        Lupa Password
                                    </Link>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3">
                                    Login
                                </Button>
                            </Form>

                            <hr/>
                            <p align="center" style={{marginTop:"-30px"}}>
                                <span style={{background:"white",padding:"10px"}}>atau</span>
                            </p>
                            <p align="center">
                                Belum punya akun ? <Link to="/register">
                                    Buat Akun
                                </Link>
                            </p>
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
                    bg={errors.email || errors.password || errors.message ? "danger" : "success"}
                >
                    <Toast.Header>
                        <strong className="me-auto">{errors.email || errors.password || errors.message ? "Login Failed" : "Info"}</strong>
                    </Toast.Header>

                    <Toast.Body className="text-white">
                        {errors.email || errors.password || errors.message ? errors.message : "Login successful."}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
