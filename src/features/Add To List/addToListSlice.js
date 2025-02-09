import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  list: localStorage.getItem("listProductLS")
    ? JSON.parse(localStorage.getItem("listProductLS"))
    : []
}

export const addToListSlice = createSlice({
  name: 'addToList',
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
  },
})

// Action creators are generated for each case reducer function
export const { addToList } = addToListSlice.actions

export default addToListSlice.reducer