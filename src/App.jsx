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
      </div>
    },
    {
      path:"/aboutUs",
      element:
      <div>
        <Navbar/>
      </div>
    },
    {
      path:"/contactUs",
      element:
      <div>
        <Navbar/>
      </div>
    },
    {
      path:"/wishList",
      element:
      <div>
        <Navbar/>
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
