import React from "react";
import products from "../assets/api/topProducts.json";
import { NavLink } from "react-router-dom";
import { Heart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../features/Add To List/listFunctionSlice";
import UserBarMBL from "../components/UserBarMBL";

const Home = () => {
  const dispatch = useDispatch();

  const handleAddToList = (id, name, price, image) => {
    dispatch(addToList({ id, name, price, image }));
  };

  return (
    <>
      <div className="hidden relative xs:flex justify-center h-full xs:h-screen w-screen xs:w-full">
        <div className=" h-full w-full overflow-hidden">
          {" "}
          {/*hero section*/}
          <img
            src="../Image/HeroImage.jpg"
            alt=""
            loading="lazy"
            className=" w-full"
          />
        </div>
      </div>
      {/* main body */}
      {screen.width < 500 ? (
        // for mobile screen
        <div className="my-4 space-y-4">
          {/* Category bar */}
          <div className="px-4 space-y-2">
            <h2 className="font-semibold">Top Categoriyaa</h2>
            <div className="flex justify-between">
              <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
            </div>
          </div>

          {/* hero section */}
          <div className="mx-4 bg-gray-300 rounded-lg overflow-hidden">
            <img src="../Image/HeroImage.jpg" alt="" />
          </div>
        </div>
      ) : (
        // for PC screen
        <div className=" w-full h-[70vh] xs:h-screen flex justify-center">
          {/*product Container  */}
          <div className=" w-full xs:w-4/5 h-full xs:h-full flex flex-col xs:flex-row gap-8 py-8 relative">
            {/* product line box */}
            <div className=" w-full xs:w-2/5 flex flex-col justify-center gap-20">
              <h1 className=" text-[2rem] xs:text-[4.6rem] font-normal text-center xs:text-left">
                Perfect Match Every New Occasion
              </h1>
              <NavLink
                to="/products"
                className=" absolute xs:static bottom-8 left-32"
              >
                <button className=" bg-buttonColor text-base w-36 h-12 rounded-lg border-2 border-black hover:shadow-boxShadow active:bg-clickColor shadow-none">
                  More Products
                </button>
              </NavLink>
            </div>

            {/* top products */}
            <div className=" w-full xs:w-3/5 flex items-center justify-around">
              {products.map((curProd) => {
                const { id, name, price, image } = curProd;

                return (
                  // productCard
                  <div
                    className=" h-68 xs:h-[70%] w-40 xs:w-80 bg-white p-[0.5rem] xs:p-4 rounded-2xl shadow-boxShadow flex flex-col justify-center xs:justify-normal items-center xs:items-start gap-[0.8rem]"
                    id={id}
                    key={id}
                  >
                    <div className=" rounded-tl-2xl rounded-tr-2xl overflow-hidden relative group w-36 xs:w-auto h-36 xs:h-fit">
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="group-hover:scale-[1.2] transition-all h-36 xs:h-72 ease-linear duration-[0.3s]"
                      />
                      <button
                        className=" absolute left-2 xs:left-4 top-40 xs:top-[18.5rem] z-10 transition-[top] ease-linear duration-[0.2s] h-8 xs:h-12 w-32 xs:w-44 text-base border-[0.01rem] border-black rounded-lg bg-buttonColor flex items-center justify-center gap-1 xs:gap-2 active:bg-clickColor group-hover:top-[6.8rem] xs:group-hover:top-56 group-hover:left-2"
                        onClick={() => handleAddToList(id, name, price, image)}
                      >
                        <Heart className=" h-[1.1rem] xs:h-[1.5rem] " />
                        <p className=" text-[0.75rem] xs:text-base font-[550]">
                          Add to Whishlist
                        </p>
                      </button>
                    </div>
                    <div className=" px-2 xs:px-4 xs:space-y-3 self-start">
                      <p className=" text-[1.8rem] xs:text-5xl">{name}</p>
                      <p className=" text-[1.3rem] xs:text-2xl">₹{price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
