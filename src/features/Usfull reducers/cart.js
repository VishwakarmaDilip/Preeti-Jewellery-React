import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartChanged: false,
  myCart: [],
  productsInCart: [],
  loading : false
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
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { toggleCartChanged, setMyCart, setProductInCart, setLoading } = cartSlice.actions

export default cartSlice.reducer