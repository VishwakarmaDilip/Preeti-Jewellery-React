import Head from "./components/Head"
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Head/>
        <Footer/>
      </div>
    },
    {
      path:"/products",
      element:
      <div>
        <Navbar/>
        <Footer/>
      </div>
    },
    {
      path:"/aboutUs",
      element:
      <div>
        <Navbar/>
        <Footer/>
      </div>
    },
    {
      path:"/contactUs",
      element:
      <div>
        <Navbar/>
        <Footer/>
      </div>
    },
    {
      path:"/wishList",
      element:
      <div>
        <Navbar/>
        <Footer/>
      </div>
    },

  ]
)

function App() {

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App
