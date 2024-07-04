import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import { signUpUser } from "../redux/user/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const moveToLogin = () => {
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      user: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }
    }
    dispatch(signUpUser(formData))
  }

  return (
    <div className='col-4 offset-4 mt-5 pt-5'>
      <h2 className="text-center mb-5">Sign Using this form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
          </Col>
          <Col>
            <Form.Control required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
          </Col>
        </Row>
        <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
          <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and numbers,
          and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>Already have an account<Button variant="link" onClick={moveToLogin}>Login here</Button> </p>

    </div>
  )
}

export default SignUp;