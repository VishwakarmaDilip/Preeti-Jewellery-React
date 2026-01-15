import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setMyCart, setProductInCart, toggleCartChanged } from './cart';
import toast from 'react-hot-toast';
import { operatePlaceOrder, setAddress, setAllAddresses, setAllAddressesPinCheck, setPinCodeService, setTAT, setUser } from './user';
import { setWishList, toggleWishListChanged } from './wishList';
import { setAllOrders, setOrder } from './orders';



// cart related api calls
export const cartApiCall = createAsyncThunk(
    "cart/cartApiCall",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/cart/getCart`,
                {
                    credentials: "include",
                }
            );

            const responseData = await response.json();
            const fetchedCart = responseData.data[0];

            // console.log(fetchedCart);


            thunkAPI.dispatch(setMyCart(fetchedCart));
            thunkAPI.dispatch(setProductInCart(fetchedCart?.products || []));
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Failed to fetch cart data")
        } finally {
            thunkAPI.dispatch(setLoading(false))
        }
    }
)
export const handleRemoveFromCart = createAsyncThunk(
    "cart/handleRemoveFromCart",
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/cart/updateProduct`,
                {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ productId, quantity: 0 }),
                }
            );
            if (response.status < 300) {
                toast.success("Product Removed From Cart")
                return true
            } else {
                toast.error("Something went wrong")
                return thunkAPI.rejectWithValue("Failed to remove from cart")
            }
        } catch (error) {
            toast.error("Network Error")
            return thunkAPI.rejectWithValue(error.message)
        } finally {
            thunkAPI.dispatch(toggleCartChanged())
        }
    }
)
export const addToCart = createAsyncThunk(
    "cart/handleAddToCart",
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/cart/addToCart`,
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
            thunkAPI.dispatch(toggleCartChanged());
        }
    }
)
export const handleUpdateCartProduct = createAsyncThunk(
    "cart/handleUpdateCartProduct",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/user/cart/updateProduct`, {
                method: "PATCH",
                headers: {
                    "content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ productId, quantity })
            })

            if (response.status < 300) {
                thunkAPI.dispatch(toggleCartChanged())
            } else {
                toast.error("Failed to Update Quantity")
                return thunkAPI.rejectWithValue("Failed to update cart product")
            }
        } catch (error) {
            console.error("Failed to update cart product:", error);
            return thunkAPI.rejectWithValue("Failed to update cart product");

        }
    }
)


export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/getUser`,

                {
                    credentials: "include",
                }
            )

            const fetchedData = await response.json()

            thunkAPI.dispatch(setUser(fetchedData.data))

        } catch (error) {
            console.error("Failed to fetch user:", error);
            return thunkAPI.rejectWithValue("Failed to fetch user");

        }
    }
)

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/me`,
                {
                    credentials: "include",
                }
            )
            if (!response.ok) {
                thunkAPI.rejectWithValue("Unauthorized");
            }

            const fetchedData = await response.json()
            

            const data = fetchedData?.data || null

            console.log(data);
            

            return data

        } catch (error) {
            console.error("Failed to check user auth:", error);
            return thunkAPI.rejectWithValue("Failed to check user auth");
        }
    }
)


// wishlist related api calls
export const handleAddToWishList = createAsyncThunk(
    "wishList/handleAddToWishList",
    async (productId, thunkAPI) => {
        try {
            const response = fetch(
                `http://localhost:3000/api/v1/user/wish/addToList`,
                {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ productId }),
                }
            );

            if ((await response).status < 300) {
                toast.success("Product Added To WishList");
                thunkAPI.dispatch(toggleWishListChanged());
            }
        } catch (error) {
            console.error("Failed to add to wishlist:", error);
            return thunkAPI.rejectWithValue("Failed to add to wishlist");

        }
    }
)
export const getWishList = createAsyncThunk(
    "wishList/getWishList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/wish/getWishList`,
                {
                    credentials: "include",
                }
            );

            const fetchedData = await response.json()
            thunkAPI.dispatch(setWishList(fetchedData?.data?.wishList || []))

        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
            return thunkAPI.rejectWithValue("Failed to fetch wishlist");

        }
    }
)
export const handleRemoveFromWishList = createAsyncThunk(
    "wishList/handleRemoveFromWishList",
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/wish/upadteWishList`,
                {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ productId }),
                }
            );

            if (response.status < 300) {
                toast.success("Product Removed From WishList");
                thunkAPI.dispatch(toggleWishListChanged());
            } else {
                toast.error("Something went wrong");
                return thunkAPI.rejectWithValue("Failed to remove from wishlist");
            }
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
            return thunkAPI.rejectWithValue("Failed to remove from wishlist");
        }
    }
)




// address related api calls
export const createAddress = createAsyncThunk(
    "user/createAddress",
    async (addressData, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/createAddress`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(addressData),
                }
            )

            if (response.status < 300) {
                toast.success("Address Saved Successfully")
            } else {
                toast.error("Failed to create address");
                return thunkAPI.rejectWithValue("Failed to create address");
            }
        } catch (error) {
            console.error("Failed to create address:", error);
            return thunkAPI.rejectWithValue("Failed to create address");
        }
    }
)

export const getAllAddress = createAsyncThunk(
    "user/getAllAddress",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/getAllAddress`,
                {
                    credentials: "include"
                }
            )

            const responseData = await response.json()
            const fetchedAddresses = responseData.data || []

            thunkAPI.dispatch(setAllAddresses(fetchedAddresses))

        } catch (error) {
            console.error("Failed to fetch addresses:", error);
            return thunkAPI.rejectWithValue("Failed to fetch addresses");
        }
    }
)

export const getAddress = createAsyncThunk(
    "user/getAddress",
    async (addressId, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/${addressId}`,
                {
                    credentials: "include",
                }
            )

            const responseData = await response.json()
            const fetchedAddress = responseData.data[0]

            thunkAPI.dispatch(setAddress(fetchedAddress))
        } catch (error) {
            console.error("Failed to fetch address:", error);
            return thunkAPI.rejectWithValue("Failed to fetch address");
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "user/deleteAddress",
    async (addressId, thunkAPI) => {       
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/delete/${addressId}`,
                {
                    method:"DELETE",
                    credentials:"include"
                }
            )

            if (response.status < 300) {
                toast.success("Address Deleted Successfully")
            } else {
                toast.error("Something went wrong..!")
            }
        } catch (error) {
            console.error("Failed to Delete the address", error);
            return thunkAPI.rejectWithValue("Failed to Delete the address")
            
        }
    }
)


export const updateAddress = createAsyncThunk(
    "user/updateAddress",
    async (addressData, thunkAPI) => {
        console.log({addressData});
        
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/update/${addressData.address_id}`,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials:"include",
                    body: JSON.stringify(addressData.data)
                }
            )

            if (response.status < 300) {
                toast.success("Address updates Successfully")
            } else {
                toast.error("Something went wrong..!")
            }
        } catch (error) {
            console.error("Failed to Update the address", error);
            return thunkAPI.rejectWithValue("Failed to Update the address")
            
        }
    }
)




// Delhivery related api calls
export const pinCodeServiceCheck = createAsyncThunk(
    "user/pinCodeServiceCheck",
    async (pinCode, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/delivery/${pinCode}`,
                {
                    credentials: "include",
                }
            )

            const responseData = await response.json()

            thunkAPI.dispatch(setPinCodeService(responseData.data))

        } catch (error) {
            console.error("Failed to check pin code service:", error);
            return thunkAPI.rejectWithValue("Failed to check pin code service");
        }
    }
)

export const pinCodeServiceCheckAllAddress = createAsyncThunk(
    "user/pinCodeServiceCheckAllAddress",
    async (pinCode, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/deliveryforAllPincode/${pinCode}`,
                {
                    credentials: "include",
                }
            )

            const responseData = await response.json()

            thunkAPI.dispatch(setAllAddressesPinCheck(responseData.data))

            // console.log(responseData.data);


        } catch (error) {
            console.error("Failed to check pin code service:", error);
            return thunkAPI.rejectWithValue("Failed to check pin code service");
        }
    }
)

export const getTAT = createAsyncThunk(
    "user/getTAT",
    async (destinationPin, thunkAPI) => {

        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/user/address/delivery/getExpectedTAT?desinationPin=${destinationPin}`,
                {
                    credentials: "include"
                }
            )
            const responseData = await response.json()
            const fetchedTAT = responseData.data.TATtime
            // console.log(fetchedTAT);


            const today = Date.now()
            const TATinDays = fetchedTAT * 24 * 60 * 60 * 1000
            const estDate = today + TATinDays

            const option = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            const estimatedDate = new Intl.DateTimeFormat("en-IN", option).format(estDate)

            thunkAPI.dispatch(setTAT(estimatedDate))

        } catch (error) {
            console.error("Failed to fetch TAT:", error);
            return thunkAPI.rejectWithValue("Failed to fetch TAT");
        }
    }
)



// order related api calls
export const createOrder = createAsyncThunk(
    "user/createOrder",
    async (orderData, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/order/createOrder`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(orderData)
                }
            )

            const responseData = await response.json()
            const order_Id = responseData?.data?._id

            if (responseData.statusCode < 300) {
                // thunkAPI.dispatch(operatePlaceOrder(order_Id))
                return order_Id
            } else {
                toast.error("Something went wrong")
            }

        } catch (error) {
            console.error("Failed to create Order", error);
            return thunkAPI.rejectWithValue("Failed to create order");
        }
    }
)

export const fetchAllOrders = createAsyncThunk(
    "order/fetchAllOrders",
    async (query, thunkAPI) => {
        try {


            const {startDate,endDate,orderStatus, page} = query
            const response = await fetch(
                `http://localhost:3000/api/v1/order/fetchAllOrdersUser?startDate=${startDate}&endDate=${endDate}&orderStatus=${orderStatus}&page=${page}`,
                {
                    credentials: "include"
                }
            )

            const responseData = await response.json()
            const fetchedOrders = responseData.data.fetchedOrders
            const pageInfo = responseData.data.pageInfo

            thunkAPI.dispatch(setAllOrders(fetchedOrders))

            return pageInfo

        } catch (error) {
            console.error("Failed to fetch orders", error);
            return thunkAPI.rejectWithValue("Failed to fetch orders");
        }
    }
)

export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (order_Id, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/order/getOrder/${order_Id}`,
                {
                    credentials: "include"
                }
            )

            const responseData = await response.json()

            const fetchedOrder = responseData.data[0]
            thunkAPI.dispatch(setOrder(fetchedOrder))

        } catch (error) {
            console.error("Failed to fetch orders", error);
            return thunkAPI.rejectWithValue("Failed to fetch orders");
        }
    }
)