import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders } from "./ApiCalls";

const initialState = {
    allOrders : [],
    order : [],
    pageInfo : {},

}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setAllOrders: (state, action) => {
            state.allOrders = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.pageInfo = action.payload
            })
    }
})

export const {setAllOrders, setOrder} = orderSlice.actions

export default orderSlice.reducer