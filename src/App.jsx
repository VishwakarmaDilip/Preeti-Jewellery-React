import Head from "./components/Head";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Bodyhome from "./components/Bodyhome";
import { Toaster } from "react-hot-toast";
import BodyWishlist from "./components/BodyWishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Head />
        <Bodyhome />
        <Footer />
      </div>
    ),
  },
  {
    path: "/products",
    element: (
      <div>
        <Navbar />
        <Footer />
      </div>
    ),
  },
  {
    path: "/aboutUs",
    element: (
      <div>
        <Navbar />
        <Footer />
      </div>
    ),
  },
  {
    path: "/contactUs",
    element: (
      <div>
        <Navbar />
        <Footer />
      </div>
    ),
  },
  {
    path: "/wishList",
    element: (
      <div>
        <header className=" h-[13dvh] flex justify-center">
        <Navbar />
        </header>
        <BodyWishlist/>
        <Footer />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
