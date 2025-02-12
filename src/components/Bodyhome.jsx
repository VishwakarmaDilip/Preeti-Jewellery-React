import React from "react";
import products from "../assets/api/topProducts.json";
import { NavLink } from "react-router-dom";
import { Heart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../features/Add To List/listFunctionSlice";

const Bodyhome = () => {
  const allList = useSelector((state) => state.addToList.list)
  const dispatch = useDispatch();

  const handleAddToList = (id, name, price,image) => {
    dispatch(addToList({id, name, price, image}));
  };

  return (
    // main body
    <div className=" w-full h-screen flex justify-center">
      {/*product Container  */}
      <div className=" w-4/5 h-full flex gap-8 py-8">
        {/* product line box */}
        <div className=" w-2/5 flex flex-col justify-center gap-20">
          <h1 className=" text-[4.6rem] font-normal">
            Perfect Match Every New Occasion
          </h1>
          <NavLink to="/products">
            <button className=" bg-buttonColor text-base w-36 h-12 rounded-lg border-2 border-black hover:shadow-boxShadow active:bg-clickColor shadow-none">
              More Products
            </button>
          </NavLink>
        </div>

        {/* top products */}
        <div className=" w-3/5 flex items-center justify-around">
          {products.map((curProd) => {
            const { id, name, price, image } = curProd;

            return (
              // productCard
              <div
                className=" h-[70%] w-80 bg-white p-4 rounded-2xl shadow-boxShadow flex flex-col gap-[0.8rem]"
                id={id}
                key={id}
              >
                <div className=" rounded-tl-2xl rounded-tr-2xl overflow-hidden relative group">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="group-hover:scale-[1.2] transition-all h-72 ease-linear duration-[0.3s]"
                  />
                  <button
                    className=" absolute left-4 top-[18.5rem] z-10 transition-[top] ease-linear duration-[0.2s] h-12 w-44 text-base border-[0.01rem] border-black rounded-lg bg-buttonColor flex items-center justify-center gap-2 active:bg-clickColor group-hover:top-56"
                    onClick={() => handleAddToList(id, name, price,image)}
                  >
                    <Heart />
                    <p className=" text-base font-[550]">Add to Whishlist</p>
                  </button>
                </div>
                <div className=" px-4 space-y-3">
                  <p className=" text-5xl">{name}</p>
                  <p className=" text-2xl">₹{price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bodyhome;
