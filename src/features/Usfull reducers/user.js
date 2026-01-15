import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { checkUserAuth, createAddress, deleteAddress, updateAddress } from "./ApiCalls";

const initialState = {
    user: null,
    address: null,
    allAddresses: [],
    pinCodeService: [],
    allAddressesPinCheck: {},
    TAT: "",
    refresh: false,
    loggedIn: false,
    loading: true
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
        setRefresh: (state) => {
            state.refresh = !state.refresh
        },
        operatePlaceOrder: (state, payload) => {
            const order_Id = payload.payload 
            setTimeout(() => {
                window.opener.location.href(`http://localhost:3000:5174/orders/${order_Id}`)
            }, 800);     
            toast.success("Order Placed")
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createAddress.fulfilled,(state) => {
                state.refresh = !state.refresh
            })
            .addCase(deleteAddress.fulfilled,(state) => {
                state.refresh = !state.refresh
            })
            .addCase(updateAddress.fulfilled,(state) => {
                state.refresh = !state.refresh
            })
            .addCase(checkUserAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(checkUserAuth.fulfilled,(state)=> {
                state.loggedIn = true
                state.loading = false
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.loggedIn = false
                state.loading = false
            })

    }
})

export const { setUser, setAllAddresses, setAddress, setPinCodeService, setAllAddressesPinCheck, setTAT, operatePlaceOrder, setRefresh } = userSlice.actions

export default userSlice.reducer