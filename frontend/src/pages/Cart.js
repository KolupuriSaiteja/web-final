import React from 'react';
import PageLayout from '../components/PageLayout';
import BreadcrumbComponent from '../components/BreadcrumbComponent';
import { Breadcrumb, Button, Card, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem, updateCartItem } from '../redux/userReducer';

export default function Cart() {
  const { cart } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  let total = 0;
  cart?.map((cartItem) => {
    total += cartItem?.product?.price * cartItem?.quantity;
  });

  return (
    <PageLayout authRequired>
      <BreadcrumbComponent>
        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
      </BreadcrumbComponent>
      {cart?.length > 0 ? (
        <Stack gap={2}>
          {cart?.map((cartItem, i) => (
            <Product key={i} cartItem={cartItem} />
          ))}
          <Card>
            <Card.Body>
              <Card.Title>Total: ${total.toFixed(2)}</Card.Title>
              <Button variant="dark" onClick={() => navigate('/checkout')}>
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Stack>
      ) : (
        <p className="text-center">No Items in Cart</p>
      )}
    </PageLayout>
  );
}

const Product = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{cartItem.product?.title}</Card.Title>
        <div className="d-flex align-items-center justify-content-between">
          <Card.Text className="m-0">${cartItem.product?.price}</Card.Text>
          <div>
            <Button
              disabled={cartItem?.quantity <= 1}
              variant="dark"
              onClick={() =>
                dispatch(
                  updateCartItem({
                    ...cartItem,
                    quantity: cartItem?.quantity - 1,
                  })
                )
              }
            >
              -
            </Button>
            <Button variant="light">{cartItem?.quantity}</Button>
            <Button
              variant="dark"
              onClick={() =>
                dispatch(
                  updateCartItem({
                    ...cartItem,
                    quantity: cartItem?.quantity + 1,
                  })
                )
              }
            >
              +
            </Button>
          </div>
          <Button
            variant="dark"
            onClick={() => dispatch(removeCartItem(cartItem.product?._id))}
          >
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
