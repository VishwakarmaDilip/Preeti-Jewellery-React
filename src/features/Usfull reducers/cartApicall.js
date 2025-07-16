import { createAsyncThunk } from '@reduxjs/toolkit'
import { setMyCart, setProductInCart, toggleCartChanged } from './cart';
import toast from 'react-hot-toast';

export const cartApiCall = createAsyncThunk(
    "cart/cartApiCall",
    async (_, thunkAPI) => {
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