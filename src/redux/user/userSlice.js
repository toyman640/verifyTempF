import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createUser = 'http://127.0.0.1:3000/signup'
const userAuth = 'http://127.0.0.1:3000/login'
const logoutUser = 'http://127.0.0.1:3000/logout'
const currentUserURL = 'http://127.0.0.1:3000/current_user'

const initialState = {
  loading: false,
  user: null,
  token: null,
  isAuthenticated: false,
  createUser: null,
  registerError: null,
  loginError: null,
  logOutError: null,
  currentUserError: null,
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
      const auth = response.headers.authorization;
      return auth;
    } catch (err) {
      console.log(err.response.status)
      return thunkApi.rejectWithValue(err.response.status);
    }
  }
);

export const getCurrentUser = createAsyncThunk('user/getCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.token;
    const headers = {
      'Authorization': token,
    }
    try {
      const response = await axios.get(currentUserURL, {headers});
      return response.data;
    } catch (err) {
      console.error('Logout failed:', err);
      throw err;
    }

  }
)

export const logUserOut = createAsyncThunk('user/logUserOut',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.token;
    const headers = {
      'Authorization': token,
    }
    try {
      const response = await axios.delete(logoutUser, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
)

// localStorage.clear();
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: () => initialState
  },
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
      .addCase(logInUser.fulfilled, (state, action) => {
        const auth = action.payload;
        return {
          ...state,
          isAuthenticated: true,
          token: auth,
          error: null,
        };
      })
      .addCase(logInUser.rejected, (state, action) => {
        console.log("Log in error", action.payload)
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          loginError: action.payload,
        }
      })
      .addCase(getCurrentUser.pending, (state, action) => ({
        ...state,
        loading: true,
        currentUserError: null,
      }))
      .addCase(getCurrentUser.fulfilled, (state, action) => ({
        ...state,
        isAuthenticated: true,
        user: action.payload,
        currentUserError: null,
      }))
      .addCase(getCurrentUser.rejected, (state, action) => ({
        ...state,
        isAuthenticated: false,
        currentUserError:action.payload
      }))
      .addCase(logUserOut.pending, (state) => ({
        ...state,
        loading: true,

      }))
      .addCase(logUserOut.fulfilled, (state, action) => ({
        ...state,
        loading: true,
        isAuthenticated: false,
        logOutError: null,

      }))
      .addCase(logUserOut.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        logOutError: action.payload,

      }))
  }
});

export const { resetState } = userSlice.actions;

export const selectLoading = (state) => state.loading;
export const selectLoginError = (state) => state.loginError;
export const selectUser = (state) => state.user;
export const selectToken = (state) => state.token;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export default userSlice.reducer;