import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "react-feather";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" mb-[4.1rem] xs:mb-0  xs:h-fit w-full bg-footerBag flex justify-center">
      {/* footer container */}
      <div className=" w-4/5 flex flex-col justify-between">
        {/* main footer */}
        <div className=" h-full py-8 px-0 border-b border-gray-500 flex flex-col xs:flex-row gap-4">
          {/*leftbox */}
          <div className=" w-full xs:w-1/2 grid grid-cols-3 grid-rows-[0.5fr_1fr_1fr] xs:flex flex-col gap-2 xs:gap-12">
            <div className=" text-[1.8rem] xs:text-[2rem] font-extrabold text-theamColor col-[1/4]">Preety Jewellery</div> {/*logo */}

            <div className="flex items-center gap-2 xs:gap-4 text-[0.8rem] xs:text-[1.2rem] place-self-center xs:place-self-start col-[1/3] pr-8">
              <Phone className=" h-4 xs:h-6" />
              <p>+1246-345-0695</p>
            </div>

            <div className="flex items-center gap-2 xs:gap-4 text-[0.8rem] xs:text-[1.2rem] place-self-center xs:place-self-start col-[3/4] pr-8">
              <Mail className=" h-4 xs:h-6" />
              <p>info@jewelpreeti.com</p>
            </div>

            <div className="flex items-center gap-2 xs:gap-4 text-[0.8rem] xs:text-[1.2rem] place-self-start col-[1/4] row-[3/4] pl-[1.3rem] xs:pl-0 ">
              <MapPin className=" h-4 xs:h-6" />
              <p>4967 Sardis Sta, Victoria 8007, Montreal</p>
            </div>
          </div>

          {/* Right box */}
          <div className=" w-full xs:w-1/2 flex flex-col xs:flex-row justify-between pr-32 gap-6 xs:gap-0">
            <div className=" grid grid-cols-3 grid-rows-[0.5fr_1fr] xs:flex flex-col gap-4 xs:gap-8 w-[180%]">
              <h2 className=" text-[1rem] xs:text-[1.5rem] col-[1/4] font-bold">Experience</h2>
              <NavLink to="/products" target="_blank" className=" text-[0.8rem] xs:text-[1.2rem] place-self-center xs:place-self-start gap-2">
                Products
              </NavLink>
              <NavLink to="/aboutUs" target="_blank" className=" text-[0.8rem] xs:text-[1.2rem] place-self-center xs:place-self-start gap-2">
                About Us
              </NavLink>
              <NavLink to="/contactUs" target="_blank" className=" text-[0.8rem] xs:text-[1.2rem] place-self-center xs:place-self-start gap-2">
                Contact Us
              </NavLink>
            </div>

            <div className=" grid grid-cols-3 grid-rows-[0.5fr_1fr] xs:flex flex-col gap-4 xs:gap-8 w-[180%]">
              <h2 className=" text-[1rem] xs:text-[1.5rem] col-[1/4] font-bold">Follow Us On</h2>
              <NavLink
                className=" text-[0.8rem] xs:text-[1.2rem] place-content-center xs:place-content-start gap-2 flex items-center xs:gap-4"
                to="https://www.instagram.com/prettyadornment/"
                target="_blank"
              >
                <Instagram className=" h-4 xs:h-6" />
                <p>Instagram</p>
              </NavLink>
              <NavLink className=" text-[0.8rem] xs:text-[1.2rem] place-content-center xs:place-content-start gap-2 flex items-center xs:gap-4" to="">
                <Facebook className=" h-4 xs:h-6" />
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
