import { useState } from "react";
import Navbar from "./Layouts/NavbarMenu";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Register() {
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
                            <Form method="POST" action="/register">
                                <input type="hidden" name="_token" value={csrfToken} />
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-user"></i>
                                        </span>
                                        <Form.Control type="text" placeholder="Input Name" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                        <Form.Control type="email" placeholder="Input Email" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-key"></i>
                                        </span>
                                        <Form.Control type={showPassword ? "text" : "password"} placeholder="Input Password" />
                                        <Button variant="light" className="border" onClick={handleShowPassword}>
                                            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </Button>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "40px" }}>
                                            <i className="fa fa-key"></i>
                                        </span>
                                        <Form.Control type={showPassword2 ? "text" : "password"} placeholder="Input Password Confirmation" />
                                        <Button variant="light" className="border" onClick={handleShowPassword2}>
                                            <i className={`fa ${showPassword2 ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </Button>
                                    </div>
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
        </>
    )
}
