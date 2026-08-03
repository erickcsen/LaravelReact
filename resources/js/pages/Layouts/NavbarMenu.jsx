import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import api  from "../../api";

export default function NavbarMenu() {
    let website_name = "Blogger";
    let logo_website = "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";
    let logo_website_mobile = "https://www.forbes.com/advisor/wp-content/uploads/2022/02/Blogger-Logo.png";
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/logout");
            window.location.href = "/login";
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }
    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="myNavbar bg-body-tertiary mb-3" sticky="top" >
                    <Container>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Navbar.Brand as={Link} to="/" className='mx-auto d-none d-md-block'>
                            <img
                                src={logo_website}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Logo Website"
                            /> &nbsp;
                            {website_name}</Navbar.Brand>
                        <Navbar.Brand as={Link} to="/" className='mx-auto d-block d-md-none position-absolute w-100 start-0' style={{ textAlign: "center", zIndex: "-1" }}>
                            <img
                                src={logo_website_mobile}
                                height="60"
                                className="d-inline-block align-top"
                                alt="Logo Website"
                            /> &nbsp;
                            {/* {website_name} */}
                        </Navbar.Brand>

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            style={{ width: "18rem" }}
                        >
                            <Offcanvas.Header>
                                <img
                                    src={logo_website}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Logo Website"
                                /> &nbsp;
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Blogger
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-start flex-grow-1">
                                    <Nav.Link as={Link} to="/" className='ps-3 rounded-3 hover-menu'>Home</Nav.Link>
                                    <Nav.Link as={Link} to="#action2" className='ps-3 rounded-3 hover-menu'>
                                        Link
                                    </Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className='ps-3 rounded-3 hover-menu'
                                    >
                                        <NavDropdown.Item as={Link} to="#action3">
                                            Action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <div className='d-block d-md-none'>&nbsp;</div>
                                </Nav>
                                <Form className="d-none d-md-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="rounded-0"
                                        aria-label="Search"
                                    />
                                    <Button variant="btn btn-light border rounded-0">
                                        <i className='fa fa-search'></i>
                                    </Button>
                                    <Link to="/login" className={(window.AppData.user)?"btn btn-light border rounded-0 ms-2 d-none":"btn btn-light border rounded-0 ms-2"}>
                                        <i className='fa fa-user'></i>
                                    </Link>
                                </Form>
                                <Form onSubmit={handleLogout} className={(window.AppData.user)?"d-md-inline d-none":"d-none"}>
                                    <input type="hidden" name="_token" value={csrfToken} />
                                    <button type="submit" className="btn btn-light border rounded-0 ms-2">
                                        <i className='fa fa-sign-out'></i>
                                    </button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
