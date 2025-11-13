import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserBarMBL from "./UserBarMBL";

const Layout = () => {
  return (
    <div className="">
      {screen.width < 500 && <UserBarMBL />}
      <div className="flex justify-center">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
