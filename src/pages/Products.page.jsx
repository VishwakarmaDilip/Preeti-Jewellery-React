import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart } from "react-feather";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import toast from "react-hot-toast";
import { toggleCartChanged } from "../features/Usfull reducers/cart";
import {
  cartApiCall,
  getWishList,
  handleAddToWishList,
  handleRemoveFromCart,
  handleRemoveFromWishList,
} from "../features/Usfull reducers/ApiCalls";
import Cookies from "js-cookie";
import UserBarMBL from "../components/UserBarMBL";

const Products = () => {
  const token = useSelector(state => state.user.loggedIn);
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const cartState = useSelector((state) => state.cart.cartChanged);
  const wishList = useSelector((state) => state.wishList.wishList);
  const listState = useSelector((state) => state.wishList.iswishListChanged);

  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [filter, setFilter] = useState(false);
  const navigate = useNavigate();

  // Fetch products based on search term, pagination, sorting, and category
  useEffect(() => {
    let page;
    if (searchTerm === "") {
      page = pageNumber;
    } else {
      page = 1; // Reset to page 1 if search term is not empty
    }
    let delay = changePage || categoryId ? 0 : 700; // Delay for debounce effect
    const callApi = setTimeout(() => {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.devbydilip.cloud/api/v1/user/getProducts?query=${searchTerm}&page=${page}&sortBy=${sortBy}&sortType=${sortType}&category=${categoryId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const responseData = await response.json();
          const allProducts = responseData.data.fetchedProduct;
          const pageData = responseData.data.pageInfo;

          setProducts(allProducts);
          setPageInfo(pageData);
        } catch (error) {
          console.log("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      setChangePage(false);
    }, delay);

    return () => clearTimeout(callApi);
  }, [searchTerm, refresh, pageNumber, sortBy, sortType, categoryId]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://api.devbydilip.cloud/api/v1/user/category/getCategories`,
          {
            credentials: "include",
          }
        );

        const responseData = await response.json();
        const allCategories = responseData.data;

        setCategory(allCategories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Cart
  useEffect(() => {
    if (token) {
      dispatch(cartApiCall());
    }
  }, [token, cartState]);

  // Fetch Wish List
  useEffect(() => {
    dispatch(getWishList());
  }, [listState]);

  const onSubmit = (data) => {
    if (data.category !== "") {
      setCategoryId(data.category);
    } else {
      setCategoryId("");
    }

    if (data.sortBy !== "") {
      const sortData = data.sortBy.split(" ");
      setSortBy(sortData[0]);
      setSortType(sortData[1] || "");
    } else {
      setSortBy("createdAt");
      setSortType("");
    }

    if (screen.width < 500) {
      setFilter(pre => !pre);
    }
  };

  const handleAddToCart = async (productId) => {
    if (token) {
      try {
        const response = await fetch(
          `https://api.devbydilip.cloud/api/v1/user/cart/addToCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
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
    } else {
      navigate("/login");
    }
  };

  const handleRemove = async (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  const handleAddToList = async (productId) => {
    dispatch(handleAddToWishList(productId));
  };

  const handleRemoveFromList = async (productId) => {
    dispatch(handleRemoveFromWishList(productId));
  };

  const toggleFilterBox = () => {
    setFilter(pre=> !pre)
  };

  return (
    // product main body
    <div className=" w-full h-fit mb-8 mt-5 xs:mt-20 flex flex-col items-center gap-8">
      <div className="w-full flex justify-center items-center gap-20">
        {/* search bar */}
        <div className="h-10 flex items-center justify-center xs:justify-start xs:pr-">
          <input
            type="text"
            placeholder="Search..."
            className="w-80 xs:w-72 h-10 border border-black rounded-lg px-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* filter form */}
        <form
          className={`fixed bottom-16 xs:bottom-0 ${filter ? "left-[11rem]": "left-[25rem]"} xs:left-0 z-20 flex xs:flex-row xs:relative flex-col bg-white gap-6 pr-4 p-4 xs:p-0 shadow-boxShadowBorder2 xs:shadow-none transition-all ease-in-out`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {screen.width < 500 && (
            <div className="flex justify-between">
              <h3 className="font-semibold">Filter</h3>
              <Icon.X size={20} onClick={() => toggleFilterBox()} />
            </div>
          )}
          <div className="flex flex-col xs:flex-row gap-6">
            <div className="relative">
              <select
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-white p-2 rounded-lg w-44 transition-all ease-in-out`}
                {...register("category")}
              >
                <option value="" className="text-sm">Category</option>
                {category?.map((cat) => (
                  <option key={cat?._id} value={cat?._id} className="text-sm">
                    {cat?.categoryName}
                  </option>
                ))}
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none focus:outline-none px-2 focus:ring-2 bg-white p-2 rounded-lg w-44"
                {...register("sortBy")}
              >
                <option value="createdAt" className="text-sm">
                  Short
                </option>
                <option value="price ascending" className="text-sm">
                  Price : Low to High
                </option>
                <option value="price descending" className="text-sm">
                  Price : High to Low
                </option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
            <button
              type="submit"
              disabled={loading}
              className={
                loading
                  ? "bg-gray-300 w-40 rounded-md "
                  : "bg-theamColor2 font-semibold w-40 rounded-md hover:shadow-boxShadow active:bg-clickColor transition-all ease-in-out"
              }
            >
              Apply
            </button>
            <button
              onClick={() => {
                setSearchTerm("");
                reset({
                  category: "",
                  sortBy: "createdAt",
                });
                if (screen.width < 500) {
                  setFilter(96);
                }
              }}
              className=" bg-[#dda337] w-40 rounded-md hover:shadow-boxShadow active:bg-[#ce9643] transition-all ease-in-out font-semibold"
            >
              Reset
            </button>
          </div>
        </form>
        {screen.width < 500 && (
          <div
            className="fixed bg-white p-2 shadow-boxShadowBorder2 rounded-full bottom-20 right-5 z-10"
            onClick={() => toggleFilterBox()}
          >
            <Icon.Filter />
          </div>
        )}
      </div>
      {/* product container */}
      {/* <div className=" w-4/5 h-fit place-items-center grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 gap-y-6 "> */}
      <div className=" w-[90%] xs:w-[75%] h-fit grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-7 xs:flex xs:flex-wrap xs:gap-14">
        {products && products?.length > 0 ? (
          products.map((currProd) => {
            return (
              // product card
              <div
                className=" bg-white rounded-2xl shadow-boxShadow flex flex-col h-72 xs:h-[25rem] w-40 xs:w-60 relative"
                key={currProd?._id}
              >
                <Heart
                  fill={
                    !wishList?.some(
                      (currItem) => currItem._id === currProd?._id
                    )
                      ? "white"
                      : "red"
                  }
                  className=" absolute right-1 top-1 cursor-pointer"
                  onClick={
                    !wishList?.some(
                      (currItem) => currItem?._id === currProd?._id
                    )
                      ? () => handleAddToList(currProd?._id)
                      : () => handleRemoveFromList(currProd?._id)
                  }
                />
                <div className={"w-full h-4/5"}>
                  {/* image box */}
                  <NavLink
                    to={`/products/${currProd?._id}`}
                    className=" w-full h-3/5 flex justify-center rounded-t-md overflow-hidden"
                  >
                    <img
                      src={currProd?.image[0]}
                      alt={currProd?.productName}
                      loading="lazy"
                      className="w-full"
                    />
                  </NavLink>

                  {/* product detail */}
                  <div className=" h-2/5 flex flex-col justify-between p-2">
                    <h1 className=" text-[1.5rem]">{currProd?.productName}</h1>
                    <div className=" flex items-center gap-[1.3rem]">
                      <p className=" text-[1rem] xs:text-2xl">
                        ₹{currProd?.price}
                      </p>
                      <p className=" text-[1rem] xs:text-2xl font-light line-through">
                        ₹{currProd?.price * 1.5}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1/5 flex justify-center items-center">
                  {!productsInCart.some(
                    (currItem) => currItem?._id === currProd._id
                  ) ? (
                    <button
                      className=" bg-buttonColor h-3/6 w-36 xs:w-52 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                      onClick={() => handleAddToCart(currProd?._id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className=" bg-buttonColor h-3/6 w-36 xs:w-52 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                      onClick={() => handleRemove(currProd?._id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className=" w-full h-[50vh] flex justify-center items-center bg-white">
            <h1 className=" text-3xl text-center w-4/5">
              No product found with this name.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
