import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartApiCall,
  getWishList,
  handleRemoveFromCart,
  handleRemoveFromWishList,
} from "../features/Usfull reducers/ApiCalls";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

const WishList = () => {
  const wishList = useSelector((state) => state.wishList.wishList);
  const cartState = useSelector((state) => state.cart.cartChanged);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishList());
  }, [wishList]);

  useEffect(() => {
    dispatch(cartApiCall());
  }, [cartState]);

  useEffect(() => {
    dispatch(cartApiCall());
  }, [cartState]);

  const handleRemove = async (productId) => {
    dispatch(handleRemoveFromWishList(productId));
  };

  const handleAddToCart = async (productId) => {
    dispatch(addToCart(productId));
  };

  const removefromCart = async (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  return (
    <div className="h-fit w-full mt-8 p-10 flex flex-col items-center gap-6">
      {/* page heading */}
      <h1 className="font-bold text-3xl self-start ml-24">
        My Wish List ({wishList.length} Item{wishList.length > 1 ? "s" : ""})
      </h1>

      {/* main body */}
      <div className="flex w-full justify-center gap-5">
        {/* cart body */}
        <div className=" bg-white rounded-lg w-9/12">
          {/* heading box */}
          <div>
            <ul className="grid grid-cols-6 p-2 pl-5 border-b border-gray-200 font-semibold">
              <li>Item</li>
              <li className="col-start-4 text-center">Price</li>
              <li className="text-center">Stock Status</li>
            </ul>
          </div>

          {/* product list */}
          <div>
            {wishList.length > 0 ? (
              wishList.map((item) => (
                <div className="border-b border-gray-200" key={item._id}>
                  <ul className="grid grid-cols-6 p-2 pl-5 items-center text-lg min-h-[145px]">
                    <li className=" flex gap-3 col-start-1 col-end-4 items-center ">
                      <NavLink to={`/products/${item._id}`} className="w-28 overflow-hidden rounded-md">
                        <img src={item.image[0]} alt="" />
                      </NavLink>
                      <div>
                        <p className="font-bold text-2xl">
                          {item?.productName}
                        </p>
                      </div>
                    </li>
                    <li className="col-start-4 text-center">₹{item?.price}</li>
                    <li className="text-center text-green-500 font-semibold">
                      <p>In Stock</p>
                    </li>
                    <li className="text-center text-red-600 ">
                      <button onClick={() => handleRemove(item._id)}>
                        Remove
                      </button>
                    </li>
                  </ul>
                  <div className="w-full flex justify-between p-3 pb-5 gap-2">
                    <Button
                      className={
                        "bg-buttonColor w-1/2 text-black font-bold hover:shadow-boxShadow active:bg-clickColor"
                      }
                      textColor={true}
                    >
                      Buy Now
                    </Button>
                    {!productsInCart?.some(
                      (currItem) => currItem?._id === item?._id
                    ) ? (
                      <Button
                        className={
                          "bg-buttonColor w-1/2 text-black font-bold hover:shadow-boxShadow active:bg-clickColor"
                        }
                        textColor={true}
                        onClick={() => handleAddToCart(item?._id)}
                      >
                        Add To cart
                      </Button>
                    ) : (
                      <Button
                        className={
                          "bg-buttonColor w-1/2 text-black font-bold hover:shadow-boxShadow active:bg-clickColor"
                        }
                        textColor={true}
                        onClick={() => removefromCart(item?._id)}
                      >
                        Remove From Cart
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-[204.8px]">
                <p>List is Empty...!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
