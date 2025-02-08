import { configureStore } from '@reduxjs/toolkit'
import addToCartReducer from '../features/Add To List/addToListSlice.js'

export const store = configureStore({
  reducer: {
    addToList: addToCartReducer,
  },
})