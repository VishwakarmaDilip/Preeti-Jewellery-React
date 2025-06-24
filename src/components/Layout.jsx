import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
      <div className="">
        <div className="flex justify-center">
        <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
        <Footer/>
      </div>
  );
};

export default Layout;