import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    user: null,
    address: null,
    allAddresses: [],
    pinCodeService: [],
    allAddressesPinCheck: {},
    TAT: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllAddresses: (state, action) => {
            state.allAddresses = action.payload || []
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setPinCodeService: (state, action) => {
            state.pinCodeService = action.payload
        },
        setAllAddressesPinCheck: (state, action) => {
            state.allAddressesPinCheck = action.payload
        },
        setTAT: (state, action) => {
            state.TAT = action.payload
        },
        operatePlaceOrder: (state, payload) => {
            const order_Id = payload.payload 
            setTimeout(() => {
                window.location.replace(`http://localhost:5174/orders/${order_Id}`)                
            }, 800);     
            toast.success("Order Placed")
        }

    }
})

export const { setUser, setAllAddresses, setAddress, setPinCodeService, setAllAddressesPinCheck, setTAT, operatePlaceOrder } = userSlice.actions

export default userSlice.reducer