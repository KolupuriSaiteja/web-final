import React, { useState } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4123/users/signup', {
        name,
        email,
        password,
      });
      alert('Sign Up Success');
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout unAuthOnly>
      <BreadcrumbComponent>
        <Breadcrumb.Item active>Sign Up</Breadcrumb.Item>
      </BreadcrumbComponent>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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
          Sign Up
        </Button>
        <p className="text-center">
          <Link to="/signin">Already have account? Signin</Link>
        </p>
      </Form>
    </PageLayout>
  );
}
