import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import api  from "../../api";

export default function NavbarMenu() {
    let website_name = "Blogger";
    let logo_website = "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";
    let logo_website_mobile = "https://www.forbes.com/advisor/wp-content/uploads/2022/02/Blogger-Logo.png";
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const AppData = window.AppData;
    const [user, setUser] = useState(AppData.user);
    useEffect(() => {
        api.get("/auth/check", {
            withCredentials: true,
        })
        .then((response) => {
            setUser(response.data.user);
        })
        .catch(() => {})
    }, []);

    window.AppData = {
        user: user,
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/logout");
            window.location.href = "/login";
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }

    const [searchBar, useSearch] = useState(false);
    const mobileNavbar = "d-inline-block ";
    const searchPopUp = "bg-dark bg-opacity-50 position-fixed top-0 bottom-0 start-0 end-0 border-0 "

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
                        <Navbar.Brand className="mx-auto position-absolute w-100 start-0 d-block d-md-none" style={{ textAlign: "center", zIndex: "-1" }}>
                            <img
                                src={logo_website_mobile}
                                height="60"
                                className={(searchBar)?"align-top d-none":"align-top d-inline"}
                                alt="Logo Website"
                            /> &nbsp;
                        </Navbar.Brand>
                        <div className='container d-inline d-md-none' style={{marginTop:"-36px",paddingLeft:"48px"}}>
                            <Form className={(searchBar)?"d-flex d-md-none":"d-none"}>
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
                        </div>
                        <button type='button' onClick={(e)=>useSearch(!searchBar)} className={(searchBar)?"btn btn-light border position-absolute end-0 me-3 d-none":"btn btn-light border position-absolute end-0 me-3 d-inline d-md-none"}>
                            <i className='fa fa-search'></i>
                        </button>
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
                            {/* Menu Example */}
                            {/* <Offcanvas.Body>
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
                            </Offcanvas.Body> */}
                            <Offcanvas.Body>
                                <Nav className="justify-content-start flex-grow-1">
                                    <Nav.Link as={Link} to="/" className='ps-3 rounded-3 hover-menu'>Home</Nav.Link>
                                    <Nav.Link as={Link} to="/profile" className={(window.AppData.user)?"d-inline d-md-none ps-3 rounded-3 hover-menu":"d-none"}>User Profile</Nav.Link>
                                    <Nav.Link as={Link} to="/articles" className='ps-3 rounded-3 hover-menu'>
                                        Articles
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/movies" className='ps-3 rounded-3 hover-menu'>
                                        Movies
                                    </Nav.Link>
                                    <NavDropdown
                                        title="Master Data"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className={(window.AppData.user)?"ps-3 rounded-3 hover-menu d-md-inline d-none":"d-none"}
                                    >
                                        <NavDropdown.Item as={Link} to="/master-articles">
                                            Master Articles
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/master-categories">
                                            Master Categories
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/master-movies">
                                            Master Movies
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <div className='d-block d-md-none'>&nbsp;</div>
                                </Nav>
                                {/* Left Menu - Only visible on mobile */}
                                <Form onSubmit={handleLogout} className={(window.AppData.user)?"d-inline d-md-none position-absolute bottom-0 start-0 mb-3 end-0 me-3":"d-none"}>
                                    <input type="hidden" name="_token" value={csrfToken} />
                                    <button type="submit" className="btn btn-light border rounded-0 ms-2 w-100">
                                        <i className='fa fa-sign-out'></i> Log Out
                                    </button>
                                </Form>
                                {/* Right Menu */}
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
                                <DropdownButton
                                    align="end"
                                    id="dropdown-menu-align-end"
                                    variant='btn btn-light border rounded-0 ms-2'
                                    className={(window.AppData.user)?"d-md-inline d-none":"d-none"}
                                    >
                                        <Dropdown.Item as={Link} to="/profile" eventKey="1">
                                            User Profile
                                        </Dropdown.Item>
                                        <Form onSubmit={handleLogout}>
                                            <Dropdown.Item as={Button} type="submit" eventKey="2">
                                                Log Out
                                            </Dropdown.Item>
                                        </Form>
                                </DropdownButton>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
            <button type='button' onClick={(e)=>useSearch(!searchBar)} className={(searchBar)?"bg-dark bg-opacity-50 position-fixed top-0 bottom-0 start-0 end-0 border-0":"bg-dark bg-opacity-50 position-fixed top-0 bottom-0 start-0 end-0 border-0 d-none"} style={{zIndex:"1000"}}>
            </button>
        </>
    );
}
