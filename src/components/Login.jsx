import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { logInUser } from '../redux/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, loginError, user, isAuthenticated } = useSelector(state => state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [badLoginMessage, setBadLoginMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAuth = {
      user: {
        email: email,
        password: password,
      }
    }
    dispatch(logInUser(userAuth));
  };

  useEffect( () => {
    if (user) {
      if (user.status.code === 200) {
        setSuccessMessage('Log in successful');
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
        navigate('/dashboard');
      }
    } else if (loginError === 401) {
      setBadLoginMessage('Invalid Email or Password. Try Again')
      setTimeout(() => {
        setBadLoginMessage('');
      }, 4000);
    } else if (loginError === 500 || loginError === undefined) {
      setBadLoginMessage('Invalid Login. Contact Admin')
      setTimeout(() => {
        setBadLoginMessage('');
      }, 4000);
    }
  }, [user, loginError])

  const moveToSignUp = () => {
    navigate('/new-user');
  };

  return (
    <div className='col-4 offset-4 mt-5 pt-5'>
      <h2>Login Page</h2>
      {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
      {badLoginMessage && <div className="mt-3 alert alert-danger">{badLoginMessage}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required value={email} onChange={handleEmailChange} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={password} onChange={handlePasswordChange} placeholder="Password" />
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