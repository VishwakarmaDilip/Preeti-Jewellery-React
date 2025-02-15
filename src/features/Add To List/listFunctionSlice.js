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
      } else {
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
    sendToWhatsapp: (state, action) => {
      const meassageData = state.list
      const tax = action.payload
      let totalPrice = state.list.reduce((accum, currProd) => {
        return accum + currProd.price;
      }, 0);
      totalPrice = totalPrice + tax
      totalPrice = totalPrice.toLocaleString("hi-IN")  
      const number = "919930974263"
      let meassage = "";
      let count = 0;
      meassageData.forEach((currProd) => {
        const { id, name, price } = currProd;
        count = count + 1
        meassage = `${meassage}${count}) Product Id : ${id}%0aProduct Name : ${name}%0aProduct Price : ₹${price}%0a%0a`
      })
      const url = `https://wa.me/${number}?text=${meassage}%0a%0aTotal Amount : ₹${totalPrice}`
      window.open(url, "_blank").focus();
    },
    contactUsToWhatsapp: (state, action) => {
      let { userName, email, messageTitle, message } = action.payload
      const number = 919930974263

      userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()
      if (action.payload) {
        const url = `https://wa.me/${number}?text=Name: ${userName}%0a%0aEmail: ${email}%0a%0aTitle: ${messageTitle}%0a%0aMessage:%0a${message}`
        window.open(url, "_blank").focus();
      }

    }
  },
})

// Action creators are generated for each case reducer function
export const { addToList, removeItem, sendToWhatsapp, contactUsToWhatsapp } = listFunctionSlice.actions

export default listFunctionSlice.reducer