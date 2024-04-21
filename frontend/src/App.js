import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ProductList from './pages/ProductList';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
