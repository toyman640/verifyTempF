import React, { useState } from "react";
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Navigation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.reducer)
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          {user ? (
            <Navbar.Text>
              {user.status.data.user.firstname} {user.status.data.user.lastname}
              <Button variant="danger" onClick={handleShow}>
                Logout
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Log Out?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    No
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Navbar.Text>
          ) : null}
          <Nav className="">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation;