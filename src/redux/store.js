import { configureStore } from '@reduxjs/toolkit'
import listFunctionReducer from '../features/Add To List/listFunctionSlice.js'

export const store = configureStore({
  reducer: {
    addToList: listFunctionReducer,
  },
})