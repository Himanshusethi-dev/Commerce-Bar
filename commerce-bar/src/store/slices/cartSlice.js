import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateCart,updateCartBuyerIdentity,getCartByID } from "../../Services/api";
const initialState = {
    cartId : null,
    cartBuyer : null,
    cartData : {}
}

export const createCartThunk = createAsyncThunk(
    'cart/createCart',
    async (cartInput,thunk)=>{
        const data = await generateCart(cartInput)
         console.log(data.data.data.cartCreate.cart.id)
         return data.data.data.cartCreate.cart
    }

)

export const  updateBuyerIDThunk  = createAsyncThunk(
    'cart/updateBuyerID',
    async (args)=>{
        // console.log({buyerIdentity,cartId} = args)
      const data = await updateCartBuyerIdentity(args.buyerIdentity,args.cartId)
       const cartActionPayload =  data.data.data.cartBuyerIdentityUpdate.cart;
    //    console.log(cartActionPayload,"slicedCart")

        return cartActionPayload;
    }

)

export const  fetchCartThunk  = createAsyncThunk(
    'cart/fetchCart',
    async (cartId)=>{
        // console.log({buyerIdentity,cartId} = args)
      const data = await getCartByID(cartId)
       const cartActionPayload =  data.data.data.cart
    //    console.log(cartActionPayload,"slicedCart")
        // console.log(data.data.data.cart)
         return cartActionPayload;
    }

)


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        // createCart : (state,action)=>{
        //         state.cartId = action.payload.id
        // }
    },extraReducers: (builder)=>{

        builder.addCase(createCartThunk.fulfilled,(state,action)=>{

            state.cartId = action.payload.id
        }).addCase(updateBuyerIDThunk.fulfilled,(state,action)=>{

            state.cartBuyer = action.payload.id
        }).addCase(fetchCartThunk.fulfilled,(state,action)=>{
            state.cartData = {...action.payload} 
        })
    }
})
export const {createCart}  = cartSlice.actions;
export default cartSlice.reducer; 