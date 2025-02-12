import Hero from "./components/Hero";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Bodyhome from "./components/Bodyhome";
import { Toaster } from "react-hot-toast";
import BodyWishlist from "./components/BodyWishlist";
import BodyProducts from "./components/BodyProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Hero />
        <Bodyhome />
        <Footer />
      </div>
    ),
  },
  {
    path: "/products",
    element: (
      <div>
        <header className=" h-[13dvh] flex justify-center">
          <Navbar />
        </header>
        <BodyProducts />
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
        <BodyWishlist />
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
