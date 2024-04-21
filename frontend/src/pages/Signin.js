import React, { useState } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import { Link } from 'react-router-dom';
import { setSession } from '../redux/userReducer';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:4123/users/signin', {
        email,
        password,
      });
      dispatch(setSession(data?.user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout unAuthOnly>
      <BreadcrumbComponent>
        <Breadcrumb.Item active>Sign In</Breadcrumb.Item>
      </BreadcrumbComponent>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Sign In
        </Button>
        <p className="text-center">
          <Link to="/signup">Don't have account? Sign Up</Link>
        </p>
      </Form>
    </PageLayout>
  );
}
