import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ShowProduct from "./pages/ShowProduct";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import UserProfile from "./pages/UserProfile";

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
