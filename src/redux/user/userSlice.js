import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createUser = 'http://127.0.0.1:3000/signup'
const userAuth = 'http://127.0.0.1:3000/login'
const logoutUser = 'http://127.0.0.1:3000/logout'

const initialState = {
  loading: false,
  user: null,
  token: null,
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
      const userData = response.data;
      const auth = response.headers.authorization;
      // console.log(response.headers.authorization)
      return { userData, auth };
    } catch (err) {
      console.log(err.response.status)
      return thunkApi.rejectWithValue(err.response.status);
    }
  }
);

export const logUserOut = createAsyncThunk('user/logUserOut',
  async (_, thunkApi) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    // const response = await axios.delete(logoutUser, {
    //   headers,
    // });
    // return response.data;
    try {
      const response = await axios.delete(logoutUser, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; // Propagate the error back to the component
    }
  }
)

localStorage.clear();
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
        user: action.payload.userData,
        isAuthenticated: true,
        token: action.payload.auth,
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

export const selectLoading = (state) => state.loading;
export const selectLoginError = (state) => state.loginError;
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export default userSlice.reducer;