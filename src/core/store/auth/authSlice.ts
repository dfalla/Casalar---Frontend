import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface User {
  name?: string;
  lastName?: string;
  uid?: string;
  token?: string;
}

export interface InitialState{
  status: string;
  user: User;
  errorMessage: string | undefined
}

const initialState: InitialState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.errorMessage = payload;
    },

    clearErrorMessage: (state) => {
        state.errorMessage = undefined;
    }
  }
});

export const { 
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage } = authSlice.actions

