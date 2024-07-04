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
      .addCase(signUpUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(signUpUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        createUser: action.payload,
        error: null,
      }))
      .addCase(signUpUser.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }));
  }
});

export default userSlice.reducer;