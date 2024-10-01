import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { logInCustomer,logOutCustomer } from "../../Services/api"
const initialState = { 
  authToken: null,
  loggedIn : false,
  message : null 
}

export const userLogin = createAsyncThunk(
     'login',
    async (input, thunkAPI) => {
      const response = await logInCustomer(input)
      if(response.data.data?.customerAccessTokenCreate.customerAccessToken){
        return response.data.data?.customerAccessTokenCreate.customerAccessToken
      }else{
        // console.log(response.data.data?.customerAccessTokenCreate?.customerUserErrors[0]?.message)
        return response.data.data?.customerAccessTokenCreate?.customerUserErrors[0]?.message
      }
       
    },
  )
  export const userLogout = createAsyncThunk(
    'logout',
   async (token) => {
     const response = await logOutCustomer(token)
    //  console.log(response);
     return response;
   },
 )


export  const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
  },
  extraReducers : (builder)=>{
    builder.addCase(userLogin.fulfilled, (state, action) => {
        // Add user to the state array
       if (action.payload?.accessToken)  {

        state.authToken = action.payload?.accessToken
        state.loggedIn  = true;
        state.message = "Logged in"
        }
        else{
          state.authToken = null;
          state.loggedIn = false;
          state.message = action.payload
            // setTimeout(()=>{
            //   state.message = "action.payload"
            // },3000)
        } 
        
        // console.log(action.payload)
      }).addCase(userLogout.fulfilled,(state,action)=>{
        state.authToken = null;
        state.loggedIn = false;
        state.message = null;
      })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default authSlice.reducer