import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import ProtectedSuppliers from './features/auth/components/ProtectedSuppliers';
import Protectall from './features/auth/components/Projectall'
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import StripeCheckout from './pages/StripeCheckout';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import Chat from "./pages/Chat/Chat";
<<<<<<< HEAD

=======
import ProductList from './features/product/components/ProductList';
// import Coffee from './pages/Coffee';
>>>>>>> 3f45a5da4a651a58f6bc00bdc7c136b29891e1a6

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
   
        <Home></Home>
      
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protectall>
        <CartPage></CartPage>
      </Protectall>
    ),
  },
  {
    path: '/chat',
    element: (
      <Protectall>
        <Chat></Chat>
      </Protectall>
    ),
  },
  {
    path: '/chat',
    element: (
      <Protected>
        <Chat></Chat>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protectall>
        <Checkout></Checkout>
      </Protectall>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protectall>
        <ProductDetailPage></ProductDetailPage>
      </Protectall>
    ),
  },
  {
    path: '/list-product',
    element: (
      <Protectall>
      <ProductList></ProductList>
      </Protectall>
    )
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedSuppliers>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedSuppliers>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedSuppliers>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedSuppliers>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedSuppliers>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedSuppliers>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedSuppliers>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedSuppliers>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protectall>
        <OrderSuccessPage></OrderSuccessPage>{' '}
      </Protectall>
    ),
  },
  {
    path: '/my-orders',
    element: (
      <Protectall>
        <UserOrdersPage></UserOrdersPage>{' '}
      </Protectall>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protectall>
        <UserProfilePage></UserProfilePage>{' '}
      </Protectall>
    ),
  },
  {
    path: '/stripe-checkout/',
    element: (
      <Protectall>
        <StripeCheckout></StripeCheckout>
      </Protectall>
    ),
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: '/dashboard',
    element: (
    <Protectall>
    <Dashboard></Dashboard>
    </Protectall>
  ),
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;
