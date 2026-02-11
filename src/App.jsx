import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home.page";
import Products from "./pages/Products.page";
import ShowProduct from "./pages/ShowProduct.page";
import About from "./pages/About.page";
import ContactUs from "./pages/ContactUs.page";
import Login from "./pages/Login.page";
import Register from "./pages/Register.page";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart.page";
import WishList from "./pages/WishList.page";
import UserProfile from "./pages/UserProfile.page";
import Checkout from "./pages/Checkout.page";
import Checkout_Payment from "./pages/Checkout_Payment.page";
import Order from "./pages/Orders.page";
import ShowOrder from "./pages/ShowOrder.page";
import SavedAddress from "./pages/SavedAddress.page";
import ShowAddress from "./pages/ShowAddress.page";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "./features/Usfull reducers/ApiCalls";
import { useEffect } from "react";
import ChangePassword from "./pages/ChangePassword.page";

const router = createBrowserRouter([
  // Open Routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:productId", element: <ShowProduct /> },
      { path: "/aboutUs", element: <About /> },
      { path: "/contactUs", element: <ContactUs /> },

      // private Routes
      {
        element: <PrivateRoute />,
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/wishList", element: <WishList /> },
          { path: "/userProfile", element: <UserProfile /> },
          { path: "/orders", element: <Order /> },
          { path: "/orders/:orderId", element: <ShowOrder /> },
          { path: "/savedAddress", element: <SavedAddress /> },
          { path: "/address", element: <ShowAddress /> },
          { path: "/changePassword", element: <ChangePassword/>}
        ],
      },
    ],
  },

  // Private routes
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/payment/:addressId",
        element: <Checkout_Payment />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
