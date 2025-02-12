import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  list: localStorage.getItem("listProductLS")
    ? JSON.parse(localStorage.getItem("listProductLS"))
    : []
}

export const listFunctionSlice = createSlice({
  name: 'listFunction',
  initialState,
  reducers: {
    addToList: (state, action) => {
      const prodData = action.payload;

      let isProdExist = state.list.some((currProd) => currProd.id === prodData.id)

      if (!isProdExist) {
        state.list.push(prodData)
        localStorage.setItem("listProductLS", JSON.stringify(state.list))
        toast.success(`${prodData.name} is added to your List`)
      }else {
        toast.error(`${prodData.name} is already in your list`)
      }
    },
    removeItem: (state, action) => {
      let id = action.payload

      const updatedList = state.list.filter((currProd) => currProd.id !== id)

      state.list = updatedList

      localStorage.setItem("listProductLS", JSON.stringify(updatedList))

      toast.success("Item removed from your list!")
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToList, removeItem } = listFunctionSlice.actions

export default listFunctionSlice.reducer