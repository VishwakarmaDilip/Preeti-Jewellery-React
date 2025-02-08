import { createSlice } from '@reduxjs/toolkit'

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
 
      state.list.push(prodData)
      localStorage.setItem("listProductLS",JSON.stringify(state.list))

      
      

    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addToList } = addToListSlice.actions

export default addToListSlice.reducer