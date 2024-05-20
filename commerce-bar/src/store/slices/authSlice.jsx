import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { logInCustomer } from "../../Services/api"
const initialState = { authToken: null }

export const userLogin = createAsyncThunk(
     'login',
    async (input, thunkAPI) => {
      const response = await logInCustomer(input)
      return response.data.data.customerAccessTokenCreate
    },
  )


export  const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action) {
    //   state.value += action.payload
    // },
  },
  extraReducers : (builder)=>{
    builder.addCase(userLogin.fulfilled, (state, action) => {
        // Add user to the state array
        state.authToken = (action.payload.customerAccessToken.accessToken)
        console.log(action.payload)
      })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default authSlice.reducer