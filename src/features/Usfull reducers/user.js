import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    address: null,
    allAddresses: [],
    pinCodeService: [],
    allAddressesPinCheck: {}
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
        }

    }
})

export const { setUser, setAllAddresses, setAddress, setPinCodeService, setAllAddressesPinCheck } = userSlice.actions

export default userSlice.reducer