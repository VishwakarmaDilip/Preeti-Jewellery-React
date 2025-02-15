import Hero from "./components/Hero";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Bodyhome from "./components/Bodyhome";
import { Toaster } from "react-hot-toast";
import BodyWishlist from "./components/BodyWishlist";
import BodyProducts from "./components/BodyProducts";
import BodyContactUs from "./components/BodyContactUs";
import BodyAbout from "./components/BodyAbout";
import ShowProduct from "./components/ShowProduct";

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
        <header className="h-[13dvh] flex justify-center">
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
        <header className="flex justify-center">
          <Navbar />
        </header>
        <BodyAbout />
        <Footer />
      </div>
    ),
  },
  {
    path: "/contactUs",
    element: (
      <div>
        <header className=" h-[13dvh] flex justify-center">
          <Navbar />
        </header>
        <BodyContactUs />
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
  {
    path: "/user",
    element: (
      <div>
        <header className="flex justify-center">
          <Navbar />
        </header>
        <BodyAbout />
        <Footer />
      </div>
    ),
      
  },
  {
    path: "/products/:name",
    element: (
      <div>
        <header className=" h-[7dvh] flex justify-center">
          <Navbar />
        </header>
        <ShowProduct/>
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
