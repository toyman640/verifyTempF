import React from 'react';
import { useNavigate } from 'react-router-dom';
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate();

  const moveToSignUp = () => {
    navigate('/new-user');
  };

  return (
    <div className='col-4 offset-4 mt-5 pt-5'>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>New User?<Button variant="link" onClick={moveToSignUp}>SignUp here</Button></p>
      
    </div>
  )
};

export default Login;