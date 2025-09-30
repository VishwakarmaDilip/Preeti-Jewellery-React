import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrders : [],
    order : [],
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
    }
})

export const {setAllOrders, setOrder} = orderSlice.actions

export default orderSlice.reducer