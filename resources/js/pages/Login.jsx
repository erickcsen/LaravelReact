import { useState } from "react";
import Navbar from "./Layouts/NavbarMenu";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Login() {
    const logoWebsite =
        "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";
    const websiteName = "Blogger";

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Navbar />

            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={5} lg={4}>
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
                                {websiteName}
                            </h3>

                            {/* Email */}
                            <Form.Group className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa fa-envelope"></i>
                                    </span>

                                    <Form.Control
                                        type="email"
                                        placeholder="Input Email"
                                    />
                                </div>
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
                                <a className="float-end mb-3">
                                    Lupa Password
                                </a>
                            </Form.Group>

                            <Button variant="primary" className="w-100 mb-3">
                                Login
                            </Button>

                            <hr/>
                            <p align="center" style={{marginTop:"-30px"}}>
                                <span style={{background:"white",padding:"10px"}}>atau</span>
                            </p>
                            <p align="center">
                                Belum punya akun ? <a href="/register">
                                    Buat Akun
                                </a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
