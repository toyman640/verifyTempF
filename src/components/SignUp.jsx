import React from "react";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const moveToLogin = () => {
    navigate('/')
  }
  return (
    <div className='col-4 offset-4 mt-5 pt-5'>
      <h2 className="text-center mb-5">Sign Using this form</h2>
      <Form>
        <Row>
          <Col>
            <Form.Control required placeholder="First name" />
          </Col>
          <Col>
            <Form.Control required placeholder="Last name" />
          </Col>
        </Row>
        <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
          <Form.Control required type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>Already have an account<Button variant="link" onClick={moveToLogin}>Login here</Button> </p>

    </div>
  )
}

export default SignUp;