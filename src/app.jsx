import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Statuses from './Statuses.jsx';
import { useLocation } from 'react-router-dom';
import States from './States.jsx';

export default function App() {

    const location = useLocation();
    const hash = location.hash.substring(1);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>OCCU</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className={hash == "" ? 'active' : ''} href="#statuses">Statuses</Nav.Link>
                        <Nav.Link href="#states">States</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container style={{marginTop: "2%"}}>
                { hash == "states" ? <States /> : <Statuses />}
            </Container>
        </>
    )
}
