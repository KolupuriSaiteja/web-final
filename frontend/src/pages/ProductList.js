import React from 'react';
import PageLayout from '../components/PageLayout';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import { Breadcrumb, Button, Card, Col, Row } from 'react-bootstrap';
import { useProducts } from '../hooks/product';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/userReducer';

export default function ProductList() {
  const { products } = useProducts();

  return (
    <PageLayout>
      <BreadcrumbComponent>
        <Breadcrumb.Item active>Products</Breadcrumb.Item>
      </BreadcrumbComponent>
      <Row>
        {products?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </Row>
    </PageLayout>
  );
}

const Product = ({ product }) => {
  const { session, cart } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAlreadyInCart = cart?.some((c) => c?.product?._id === product?._id);

  const onAddToCart = () => {
    if (!session?._id) {
      navigate('/signin');
    } else if (!isAlreadyInCart) {
      dispatch(addToCart({ product, quantity: 1 }));
    } else {
      navigate('/cart');
    }
  };
  return (
    <Col key={product?._id} xs={12} md={4} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={`http://localhost:4123/shoes/${product?.image}`}
        />
        <Card.Body>
          <Card.Title>{product?.title}</Card.Title>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Text className="m-0">${product?.price}</Card.Text>
            <Button variant="dark" onClick={onAddToCart}>
              {isAlreadyInCart ? 'Go' : 'Add'} To Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
