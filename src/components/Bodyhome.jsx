import React from "react";
import products from "../assets/api/topProducts.json";
import { NavLink } from "react-router-dom";

const Bodyhome = () => {
  return (

    // main body
    <div className=" w-full h-screen flex justify-center"> 

        {/*product Container  */}
      <div className=" w-4/5 h-full flex gap-8 py-8">
            {/* product line box */}
        <div className=" w-2/5 flex flex-col justify-center gap-20">
          <h1 className=" text-[4.6rem] font-normal">Perfect Match Every New Occasion</h1>
          <NavLink to="/products">
            <button className=" bg-buttonColor text-base w-36 h-12 rounded-lg border-2 border-black hover:shadow-boxShadow">More Products</button>
          </NavLink>
        </div>

        <div class="topProducts">{products.forEach((curProd) => {
            
        })}</div>
      </div>
    </div>
  );
};

export default Bodyhome;
