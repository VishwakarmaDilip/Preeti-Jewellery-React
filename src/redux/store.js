import { configureStore } from '@reduxjs/toolkit'
import listFunctionReducer from '../features/Add To List/listFunctionSlice.js'
import cartReducer from '../features/Usfull reducers/cart.js'
import wishListReducer from '../features/Usfull reducers/wishList.js'
import userReducer from '../features/Usfull reducers/user.js'
import orderReducer from '../features/Usfull reducers/orders.js'

export const store = configureStore({
  reducer: {
    addToList: listFunctionReducer,
    cart : cartReducer,
    wishList : wishListReducer,
    user:  userReducer,
    order: orderReducer
  },
})