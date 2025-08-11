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
    ],
  },

  // Private routes
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/wishList", element: <WishList /> },
          { path: "/userProfile", element: <UserProfile /> },
        ],
      },
    ],
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
