import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartChanged: false,
  myCart: [],
  productsInCart: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartChanged: (state) => {
      state.cartChanged = !state.cartChanged
    },
    setMyCart: (state, action) => {
      state.myCart = action.payload
    },
    setProductInCart: (state, action)=> {
      state.productsInCart = action.payload
    }
  }
})

export const { toggleCartChanged, setMyCart, setProductInCart } = cartSlice.actions

export default cartSlice.reducer