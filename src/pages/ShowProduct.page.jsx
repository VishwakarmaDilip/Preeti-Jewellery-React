import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../assets/api/product.json";
import { Heart, Info } from "react-feather";
import PriceDetail from "../components/PriceDetail.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  removeItem,
} from "../features/Add To List/listFunctionSlice.js";
import ProductDetail from "../components/ProductDetail.jsx";
import {
  cartApiCall,
  getWishList,
  handleAddToWishList,
  handleRemoveFromCart,
  handleRemoveFromWishList,
} from "../features/Usfull reducers/ApiCalls.js";
import toast from "react-hot-toast";
import { toggleCartChanged } from "../features/Usfull reducers/cart.js";
import { set } from "react-hook-form";

const ShowProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList.wishList);
  const listState = useSelector((state) => state.wishList.iswishListChanged);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const cartState = useSelector((state) => state.cart.cartChanged);

  const [product, setProduct] = useState({});
  const [viewImage, setViewImage] = useState("");
  const [moreImages, setMoreImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [productDetail, setProductDetail] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.devbydilip.cloud/api/v1/user/getProduct/${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        const fetchedProduct = responseData.data[0];
        const images = fetchedProduct.image;
        const firstImage = images[0];

        setMoreImages(images);
        setProduct(fetchedProduct);
        setViewImage(firstImage);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, refresh]);

  // Fetch Wish List
  useEffect(() => {
    dispatch(getWishList());
  }, [listState]);

  useEffect(() => {
    dispatch(cartApiCall());
  }, [cartState]);

  const handleAddToList = async (productId) => {
    dispatch(handleAddToWishList(productId));
  };

  const handleRemoveFromList = async (productId) => {
    dispatch(handleRemoveFromWishList(productId));
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await fetch(
        `https://api.devbydilip.cloud/api/v1/user/cart/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId, quantity }),
        }
      );

      if (response.status < 300) {
        toast.success("Product Added To Cart");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleCartChanged());
    }
  };

  const handleRemove = async (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  return (
    <div className="mt-[5vh] mb-[8vh] xs:mb-0 w-full h-fit xs:h-screen flex items-center justify-center">
      <div className=" w-[90%] xs:w-4/5 h-full flex flex-col xs:flex-row items-center justify-center gap-8">
        {/*Product image */}
        <div className="w-1/2 flex flex-col gap-10 py-10">
          {/* image */}
          <div className="xs:h-96 flex items-center justify-center">
            {viewImage && <img src={viewImage} alt="" className="h-full" />}
          </div>

          {/* More Image */}
          <div className="flex gap-4 justify-center">
            {moreImages?.map((img, index) => (
              <div
                key={index}
                onClick={() => setViewImage(img)}
                className={`h-20 cursor-pointer p-1 rounded transition-transform hover:scale-105 ${
                  viewImage === img
                    ? "border-4 border-theamColor2"
                    : "border border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* product details */}
        <div className=" w-full xs:w-[30%] h-[80%] flex flex-col justify-between bg-white p-4 rounded-2xl shadow-boxShadow relative">
          <ProductDetail
            setProductDetail={setProductDetail}
            productDetail={productDetail}
            product={product}
          />
          <div className=" space-y-4">
            <div className="flex justify-between items-center">
              <h1 className=" text-2xl text-gray-500 font-bold">
                {product?.productName}
              </h1>

              <Heart
                fill={
                  !wishList?.some((currItem) => currItem._id === productId)
                    ? "white"
                    : "red"
                }
                className="cursor-pointer"
                onClick={
                  !wishList?.some((currItem) => currItem?._id === productId)
                    ? () => handleAddToList(productId)
                    : () => handleRemoveFromList(productId)
                }
              />
            </div>

            <div className=" space-y-1">
              <div className=" text-3xl relative w-fit pr">
                ₹{product?.price}
                <Info className=" absolute top-2 -right-6 h-4 cursor-pointer peer" />
                <PriceDetail price={product?.price} />
              </div>
              <p className=" bg-[#F8F8FF] w-fit text-xs p-1 px-2 rounded-2xl">
                Free Delivery
              </p>
            </div>
          </div>

          {/* size & quantity*/}
          <div className=" space-y-6">
            <p className=" text-xl font-bold">Size & Quantity</p>
            <div className="space-y-4">
              <div className=" flex gap-4 text-gray-300 ">
                <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg cursor-not-allowed">
                  S
                </button>
                <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg cursor-not-allowed">
                  M
                </button>
                <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg cursor-not-allowed">
                  L
                </button>
                <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg cursor-not-allowed">
                  XL
                </button>
              </div>

              <div className="flex border border-gray-400 justify-between items-center px-2 w-24 text-gray-400">
                <button
                  onClick={() =>
                    setProductQuantity((prev) => Math.max(prev - 1, 1))
                  }
                >
                  -
                </button>
                <p className="text-black">{productQuantity}</p>
                <button onClick={() => setProductQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Product detail */}
          <div className=" space-y-2 my-5 xs:my-0">
            <h2 className=" text-2xl font-extrabold">Product Detail</h2>
            <div>
              <p>Product Name: {product?.productName}</p>
              <p>Net Quantity: {product?.quantity}</p>
              <p>PID: {product?.productId}</p>
              <p
                className="text-blue-500 cursor-pointer w-fit"
                onClick={() => setProductDetail(true)}
              >
                More..
              </p>
            </div>
          </div>

          {/* action button */}
          <div className=" flex flex-wrap justify-center gap-4 w-full ">
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">
              Buy Now
            </button>
            {!productsInCart.some((currItem) => currItem?._id === productId) ? (
              <button
                className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
                onClick={() => handleAddToCart(productId, productQuantity)}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
                onClick={() => handleRemove(productId)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
