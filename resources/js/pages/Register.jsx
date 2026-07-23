import { useState } from "react";
import Navbar from "./Layouts/NavbarMenu";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";


import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/register", form);

            setShowToast(true);
            setErrors({});
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            if (error.response?.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
    };

    const logoWebsite =
        "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";
    const websiteName = "Blogger";

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>
            <Navbar/>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5} xl={4}>
                        <div className="border rounded p-4 shadow-sm">
                            <div className="position-absolute">
                                <a href="/login" className="btn btn-light border" onClick={handleShowPassword}>
                                    <i className="fa fa-angle-left"></i>
                                </a>
                            </div>
                            <div className="text-center mb-3">
                                <img
                                    src={logoWebsite}
                                    width="60"
                                    height="60"
                                    alt="Logo Website"
                                />
                            </div>

                            <h3 className="text-center mb-4">
                                Register
                            </h3>
                            <Form method="POST" onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value={csrfToken} />
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-user"></i>
                                        </span>
                                        <Form.Control
                                            type="text"
                                            placeholder="Input Name"
                                            value={form.name}
                                            onChange={(e) => setForm({...form, name: e.target.value})}
                                            isInvalid={!!errors.name}
                                        />
                                    </div>
                                    {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                        <Form.Control
                                            type="email"
                                            placeholder="Input Email"
                                            value={form.email}
                                            onChange={(e) => setForm({...form, email: e.target.value})}
                                            isInvalid={!!errors.email}
                                        />
                                    </div>
                                    {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-key"></i>
                                        </span>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Input Password"
                                            value={form.password}
                                            onChange={(e) => setForm({...form, password: e.target.value})}
                                            isInvalid={!!errors.password}
                                        />
                                        <Button variant="light" className="border" onClick={handleShowPassword}>
                                            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </Button>
                                    </div>
                                    {errors.password && <div className="text-danger">{errors.password[0]}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-key"></i>
                                        </span>
                                        <Form.Control
                                            type={showPassword2 ? "text" : "password"}
                                            placeholder="Input Password Confirmation"
                                            value={form.password_confirmation}
                                            onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
                                            isInvalid={!!errors.password_confirmation}
                                        />
                                        <Button variant="light" className="border" onClick={handleShowPassword2}>
                                            <i className={`fa ${showPassword2 ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </Button>
                                    </div>
                                    {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation[0]}</div>}
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Register
                                </Button>

                                <div className="text-center mt-3">
                                    Sudah punya akun? <a href="/login">Login</a>
                                </div>
                            </Form>
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
                    bg="success"
                >
                    <Toast.Header>
                        <strong className="me-auto">Berhasil</strong>
                    </Toast.Header>

                    <Toast.Body className="text-white">
                        Registrasi berhasil.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
