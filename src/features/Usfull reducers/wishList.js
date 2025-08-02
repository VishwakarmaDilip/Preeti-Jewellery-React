import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    iswishListChanged: false,
    wishList: [],
}

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        toggleWishListChanged: (state) => {
            state.iswishListChanged = !state.iswishListChanged
        },
        setWishList: (state, action) => {
            state.wishList = action.payload
        },
    }
})

export const {toggleWishListChanged,setWishList} = wishListSlice.actions

export default wishListSlice.reducer