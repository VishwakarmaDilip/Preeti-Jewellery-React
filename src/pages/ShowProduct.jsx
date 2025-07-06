import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../assets/api/product.json";
import { Info } from "react-feather";
import PriceDetail from "../components/PriceDetail.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  removeItem,
} from "../features/Add To List/listFunctionSlice.js";

const ShowProduct = () => {
  const allList = useSelector((state) => state.addToList.list);
  const param = useParams();
  const allProducts = products;
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [viewImage, setViewImage] = useState("");
  const [moreImages, setMoreImages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [AddProductPage, setAddProductPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/getProduct/${productId}`,
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

  const handleWishlist = (id, name, price, image) => {
    dispatch(addToList({ id, name, price, image }));
  };
  const removeFromWL = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="mt-[5vh] xs:mt-0 mb-[8vh] xs:mb-0 w-full h-fit xs:h-screen flex items-center justify-center">
      <div className=" w-[90%] xs:w-4/5 h-full flex flex-col xs:flex-row items-center justify-center gap-8">
        
        {/*Product image */}
        <div className="w-1/2 flex flex-col gap-10 py-10">
          {/* image */}
          <div className="h-96 flex items-center justify-center">
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
        <div className=" w-full xs:w-[30%] h-[80%] flex flex-col gap-8 bg-white p-4 rounded-2xl shadow-boxShadow">
          <h1 className=" text-2xl text-gray-500 font-bold">{product?.productName}</h1>
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

          {/* size */}
          <div className=" space-y-2">
            <p className=" text-xl font-bold">Size</p>
            <div className=" flex gap-4">
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">S</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">M</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">L</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">XL</button>
            </div>
          </div>

          {/* Product detail */}
          <div className=" space-y-2">
            <h2 className=" text-2xl font-extrabold">Product Detail</h2>
            <div>
              <p>Product Name: {product?.productName}</p>
              <p>Net Quantity: {product?.quantity}</p>
              <p>PID: {product?.productId}</p>
            </div>
          </div>

          {/* action button */}
          <div className=" flex flex-wrap justify-center gap-4 w-full">
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">
              Buy Now
            </button>
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">
              Add to Cart
            </button>
            {
            // !allList.find((currProd) => currProd.id === id) 
            false
            ? (
              <button
                className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
                onClick={() => handleWishlist(id, name, price, image)}
              >
                Add to wishlist
              </button>
            ) : (
              <button
                className=" w-44 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
                onClick={() => removeFromWL(id)}
              >
                Remove from wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
