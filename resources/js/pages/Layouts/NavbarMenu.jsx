import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NavbarMenu() {
    let website_name = "Blogger";
    let logo_website = "https://img.utdstc.com/icon/8bf/b0d/8bfb0d6e62b2cc74d1b68e75422c47ee1b0fe83a8b864b53b00bac6383dee49c:600";

    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="myNavbar bg-body-tertiary mb-3" sticky="top" >
                    <Container>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Navbar.Brand href="/" className='mx-auto d-none d-md-block'>
                            <img
                                src={logo_website}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Logo Website"
                            /> &nbsp;
                            {website_name}</Navbar.Brand>
                        <Navbar.Brand href="/" className='mx-auto d-block d-md-none position-absolute w-100 start-0' style={{ textAlign: "center", zIndex: "-1" }}>
                            <img
                                src={logo_website}
                                width="30"
                                height="30"
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
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-start flex-grow-1 ps-3">
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav.Link href="#action2">Link</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <div className='d-block d-md-none'>&nbsp;</div>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="rounded-0"
                                        aria-label="Search"
                                    />
                                    <Button variant="btn btn-light border rounded-0">
                                        <i className='fa fa-search'></i>
                                    </Button>
                                    <a href='/login' className='btn btn-light border ms-2'>
                                        <i className='fa fa-user'></i>
                                    </a>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
