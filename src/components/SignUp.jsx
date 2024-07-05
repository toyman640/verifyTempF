import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { signUpUser } from "../redux/user/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, createUser } = useSelector(state => state.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [registrationError, setRegistrationError] = useState('');

  const moveToLogin = () => {
    navigate('/')
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');
      return;
    }

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

  useEffect(() => {
    if (createUser) {
      if (createUser.status && createUser.status.code === 200) {
        setSuccessMessage('Registration successful! Please log in.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordError('');
        setRegistrationError('');
      } else if (createUser.status && createUser.status.code === 422) {
        setRegistrationError(createUser.status.message);
        setPasswordError('');
        setSuccessMessage('');
      } else {
        setRegistrationError('Registration failed. Please try again.');
        setPasswordError('');
        setSuccessMessage('');
      }
    }
  }, [createUser]);


  return (
    <div className='col-4 offset-4 mt-5 pt-5'>
      <h2 className="text-center mb-5">Sign Using this form</h2>
      {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      {registrationError && <div className="mt-3 alert alert-danger">{registrationError}</div>}
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
        {/* <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group> */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputGroup>
        {passwordError && <Form.Text className="text-danger col-12">{passwordError}</Form.Text>}
        <Button variant="primary" className="col-12" type="submit">
          Register
        </Button>
      </Form>
      <p>Already have an account<Button variant="link" onClick={moveToLogin}>Login here</Button> </p>

    </div>
  )
}

export default SignUp;