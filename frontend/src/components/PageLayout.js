import React from 'react';
import NavbarComponent from './NavbarComponent';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function PageLayout({
  children,
  unAuthOnly = false,
  authRequired = false,
}) {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  if (unAuthOnly && user?.session?._id) {
    navigate('/');
  }
  return (
    <div>
      <NavbarComponent />
      <Container>
        {authRequired ? (
          user?.session?._id ? (
            children
          ) : (
            <div className="text-center mt-4">
              <Button href="/signin">Signin Required</Button>
            </div>
          )
        ) : (
          children
        )}
      </Container>
    </div>
  );
}
