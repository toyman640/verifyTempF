import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createUser = 'http://127.0.0.1:3000/signup'

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  createUser: null,
  error: null,
}

export const signUpUser = createAsyncThunk('user/signUpUser', 
  async (formData) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(createUser, formData, {
      headers,
    });
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(signUpUser.pending, (state) => {
        console.log('Pending action triggered');
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        console.log('Fulfilled action triggered:', action.payload);
        return {
          ...state,
          loading: false,
          createUser: action.payload,
          error: null,
        };
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log('Rejected action triggered:', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload?.data?.status?.message || 'An error occurred',
        };
      });
  }
});

export default userSlice.reducer;