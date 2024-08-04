import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateCart,updateCartBuyerIdentity,getCartByID,updateCartLine,deleteCartLine } from "../../Services/api";
const initialState = {
    cartId : null,
    cartBuyer : null,
    cartData : {},
    loading  : false
}

export const createCartThunk = createAsyncThunk(
    'cart/createCart',
    async (cartInput,thunk)=>{
        const data = await generateCart(cartInput)
        //  console.log(data.data.data.cartCreate.cart.id)
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
        // console.log("cartId",cartId)
      const data = await getCartByID(cartId)
       const cartActionPayload =  data.data.data.cart
    //    console.log(cartActionPayload,"slicedCart")
        //  console.log("cartActionPayload",data)
         return cartActionPayload;
    }

)

export const updateCartLineThunk = createAsyncThunk(
    'cart/updateCart',
    async (args)=>{
        console.log("rereder",args.cartId,args.lines)
         const data = await updateCartLine(args.cartId,args.lines)
         console.log("cartUpdateRedux",data)
           return data
    }

)

export const deleteCartLineThunk = createAsyncThunk(
    'cart/deleteCartLine',
    async (args)=>{
        // console.log("rereder",args.cartId,args.lines)
        console.log("rereder",args.cartId,args.lineIds)
         const data = await deleteCartLine(args.cartId,args.lineIds)
         console.log("cartUpdateRedux",data)
           return data
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
        }).addCase(fetchCartThunk.pending,(state,action)=>{
            state.loading = true
        }).addCase(fetchCartThunk.fulfilled,(state,action)=>{
            state.cartData = {...action.payload} 
            state.loading = false
        })
        .addCase(updateCartLineThunk.fulfilled,(state,action)=>{
            // state.cartId = action.payload.id 
            // return action.payload;
        }).addCase(deleteCartLineThunk.fulfilled,(state,action)=>{
            state.loading = false;
        })
        .addCase(deleteCartLineThunk.pending,(state,action)=>{
                state.loading = true;
        })
    }
})
export const {createCart}  = cartSlice.actions;
export default cartSlice.reducer; 