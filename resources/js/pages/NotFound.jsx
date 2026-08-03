import Navbar from "./Layouts/NavbarMenu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = "Page Not Found";
    }, []);

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5} xl={4}>
                        <div className="border rounded p-4 shadow-sm">
                            <h3 className="text-center mb-4">
                                404 Not Found
                            </h3>
                            <p className="text-center">
                                The page you are looking for does not exist.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
