import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Heart } from "react-feather";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";

const Products = () => {
  const allList = useSelector((state) => state.addToList.list);
  const dispatch = useDispatch();
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
            `http://localhost:3000/api/v1/user/getProducts?query=${searchTerm}&page=${page}&sortBy=${sortBy}&sortType=${sortType}&category=${categoryId}`,
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
          `http://localhost:3000/api/v1/user/category/getCategories`,
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
  };
  return (
    // product main body
    <div className=" w-full h-fit mb-8 mt-20 flex flex-col items-center gap-8">
      <div className="w-full flex justify-center items-center gap-20">
        {/* search bar */}
        <div className="h-10 flex items-center justify-center xs:justify-start xs:pr-">
          <input
            type="text"
            placeholder="Search..."
            className=" w-72 h-10 border border-black rounded-lg px-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* filter form */}
        <form className="flex gap-6 pr-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="relative">
              <select
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-white p-2 rounded-lg w-40 transition-all ease-in-out`}
                {...register("category")}
              >
                <option value="">Category</option>
                {category?.map((cat) => (
                  <option key={cat?._id} value={cat?._id}>
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
                <option value="createdAt">Short</option>
                <option value="price ascending">Price : Low to High</option>
                <option value="price descending">Price : High to Low</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <button
              type="submit"
              disabled={loading}
              className={loading ? "bg-gray-300 w-40 rounded-md " : "bg-theamColor2 font-semibold w-40 rounded-md hover:shadow-boxShadow active:bg-clickColor transition-all ease-in-out"}
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
              }}
              className=" bg-[#dda337] w-40 rounded-md hover:shadow-boxShadow active:bg-[#ce9643] transition-all ease-in-out font-semibold"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {/* product container */}
      {/* <div className=" w-4/5 h-fit place-items-center grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 gap-y-6 "> */}
      <div className=" w-[85%] xs:w-[75%] h-fit grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-7 xs:flex xs:flex-wrap xs:gap-14">
        {products && products?.length > 0 ? (
          products.map((currProd) => {
            return (
              // product card
              <div
                className=" bg-white p-4 rounded-2xl shadow-boxShadow flex flex-col gap-6 h-72 xs:h-[25rem] w-40 xs:w-60 relative"
                key={currProd?._id}
              >
                <Heart
                  fill={
                    // !allList.some((currProd) => currProd._id === _id)
                    true ? "white" : "red"
                  }
                  className=" absolute right-7 cursor-pointer"
                  onClick={
                    // !allList.some((currProd) => currProd?._id === _id)
                    true
                      ? () =>
                          handleAddToList(
                            currProd?._id,
                            currProd?.productName,
                            currProd?.price,
                            currProd?.image[0]
                          )
                      : () => handleRemove(currProd?._id)
                  }
                />
                <div className={"w-full h-full"}>
                  {/* image box */}
                  <NavLink
                    to={`/products/${currProd?._id}`}
                    className=" w-full h-[60%] flex justify-center rounded-md overflow-hidden"
                  >
                    <img
                      src={currProd?.image[0]}
                      alt={currProd?.productName}
                      loading="lazy"
                      className="h-full"
                    />
                  </NavLink>

                  {/* product detail */}
                  <div className=" h-1/2 flex flex-col justify-evenly">
                    <h1 className=" text-[1.5rem] xs:text-[2.2rem]">
                      {currProd?.productName}
                    </h1>
                    <div className=" flex items-center gap-[1.3rem]">
                      <p className=" text-[1rem] xs:text-2xl">
                        ₹{currProd?.price}
                      </p>
                      <p className=" text-[1rem] xs:text-2xl font-light line-through">
                        ₹{currProd?.price * 3}
                      </p>
                    </div>
                  </div>
                </div>
                {
                  // !allList.some((currProd) => currProd._id === _id)
                  true ? (
                    <button
                      className=" bg-buttonColor h-10 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                      onClick={() =>
                        handleAddToList(
                          currProd?._id,
                          name,
                          currProd?.price,
                          image
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className=" bg-buttonColor h-10 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                      onClick={() => handleRemove(_id)}
                    >
                      Remove
                    </button>
                  )
                }
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
