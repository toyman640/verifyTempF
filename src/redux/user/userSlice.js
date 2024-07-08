import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createUser = 'http://127.0.0.1:3000/signup'
const userAuth = 'http://127.0.0.1:3000/login'

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  createUser: null,
  registerError: null,
  loginError: null
}

export const signUpUser = createAsyncThunk('user/signUpUser', 
  async (formData, thunkApi) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(createUser, formData, {
        headers,
      });
      return response.data;
    } catch (err) {
      console.log(err.response.status)
      return thunkApi.rejectWithValue(err.response.status);
    }

  }
);

export const logInUser = createAsyncThunk('user/logInUser',
  async (loginData, thunkApi) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(userAuth, loginData, {
        headers,
      });
      return response.data;
    } catch (err) {
      console.log(err.response.status)
      return thunkApi.rejectWithValue(err.response.status);
    }
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
        registerError: action.payload,

      }))
      .addCase(logInUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(logInUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error:null,
      }))
      .addCase(logInUser.rejected, (state, action) => {
        console.log("Log in error", action.payload)
        return {

          ...state,
          loading: false,
          isAuthenticated: false,
          loginError: action.payload,
        }
      })
  }
});

export default userSlice.reducer;