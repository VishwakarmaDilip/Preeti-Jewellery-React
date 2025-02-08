import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "react-feather";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" h-fit w-full bg-footerBag flex justify-center">
      {/* footer container */}
      <div className="w-4/5 flex flex-col justify-between">
        {/* main footer */}
        <div className=" h-full py-8 px-0 border-b border-gray-500 flex">
          {/*leftbox */}
          <div className="w-1/2 flex flex-col gap-12">
            <div className=" text-[2rem] font-extrabold text-theamColor">Preety Jewellery</div> {/*logo */}

            <div className="flex items-center gap-4 text-[1.2rem]">
              <Phone />
              <p>+1246-345-0695</p>
            </div>

            <div className="flex items-center gap-4 text-[1.2rem]">
              <Mail />
              <p>info@jewelpreeti.com</p>
            </div>

            <div className="flex items-center gap-4 text-[1-2rem]">
              <MapPin />
              <p>4967 Sardis Sta, Victoria 8007, Montreal</p>
            </div>
          </div>

          {/* Right box */}
          <div className=" w-1/2 flex justify-between pr-32">
            <div className="flex flex-col gap-8">
              <h2 className=" text-[1.5rem] font-bold">Experience</h2>
              <NavLink to="/products" className="text-xl">
                Products
              </NavLink>
              <NavLink to="/aboutUs" className="text-xl">
                About Us
              </NavLink>
              <NavLink to="/contactUs" className="text-xl">
                Contact Us
              </NavLink>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className=" text-[1.5rem] font-bold">Follow Us On</h2>
              <NavLink
                className="text-xl flex items-center gap-4"
                to="https://www.instagram.com/prettyadornment/"
                target="_blank"
              >
                <Instagram />
                <p>Instagram</p>
              </NavLink>
              <NavLink className="text-xl flex items-center gap-4" to="">
                <Facebook />
                <p>Facebook</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className=" m-auto text-textColor3">All rights reserved</div>
      </div>
    </div>
  );
};

export default Footer;
