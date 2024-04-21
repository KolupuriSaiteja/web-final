import React, { useState } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/userReducer';

export default function Checkout() {
  const { cart, session } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    creditCard: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
    },
    address: {
      addressLine: '',
      city: '',
      postalCode: '',
      province: '',
      country: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setState((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value,
      },
    }));
  };

  let total = 0;
  cart?.map((cartItem) => {
    total += cartItem?.product?.price * cartItem?.quantity;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...state, total, user: session?._id, cartItem: cart };
    axios
      .post('http://localhost:4123/orders', payload)
      .then((response) => {
        dispatch(clearCart());
        alert('Order Placed');
        navigate('/');
      })
      .catch((error) => {
        debugger;
        console.error('Error submitting order:', error);
      });
  };

  return (
    <PageLayout authRequired>
      <BreadcrumbComponent>
        <Breadcrumb.Item>
          <Link to="/cart">Cart</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
      </BreadcrumbComponent>
      <Form onSubmit={handleSubmit}>
        <h6>Order Total: ${total.toFixed(2)}</h6>
        <h6>Address Details</h6>
        <Form.Group className="mt-2" controlId="addressAddressLine">
          <Form.Label>Address Line</Form.Label>
          <Form.Control
            type="text"
            name="address.addressLine"
            value={state.address.addressLine}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="addressCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="address.city"
            value={state.address.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="addressPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="address.postalCode"
            value={state.address.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="addressProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            name="address.province"
            value={state.address.province}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="addressCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="address.country"
            value={state.address.country}
            onChange={handleChange}
            required
          />
        </Form.Group>{' '}
        <h6 className="mt-4">Credit Card Details</h6>
        <Form.Group className="mt-2" controlId="creditCardName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="creditCard.name"
            value={state.creditCard.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="creditCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="creditCard.number"
            value={state.creditCard.number}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="creditCardExpiry">
          <Form.Label>Expiry</Form.Label>
          <Form.Control
            type="text"
            name="creditCard.expiry"
            value={state.creditCard.expiry}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="creditCardCvc">
          <Form.Label>CVC</Form.Label>
          <Form.Control
            type="text"
            name="creditCard.cvc"
            value={state.creditCard.cvc}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="mt-2 mb-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </PageLayout>
  );
}
