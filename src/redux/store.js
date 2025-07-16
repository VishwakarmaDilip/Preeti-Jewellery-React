import { configureStore } from '@reduxjs/toolkit'
import listFunctionReducer from '../features/Add To List/listFunctionSlice.js'
import cartReducer from '../features/Usfull reducers/cart.js'

export const store = configureStore({
  reducer: {
    addToList: listFunctionReducer,
    cart : cartReducer,
  },
})