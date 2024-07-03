import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { build } from "vite";

const createUser = 'http://127.0.0.1:3000/users/registrations'

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
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
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }))
      .addCase(signUpUser.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }));
  }
});

export default userSlice.reducer;