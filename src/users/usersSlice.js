import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  isLoading: true,
  error: '',
};

const usersURL = 'https://randomuser.me/api/?results=5';

const getUsers = createAsyncThunk(
  'users/getUsersInfo',
  async (thunkAPI) => {
    try {
      const response = await axios(usersURL);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state, action) => ({
      ...state,
      users: action.payload,
      isLoading: true,
    }))
    .addCase(getUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      isLoading: false,
    }))
    .addCase(getUsers.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error.message,
    }))
  }, 
});

export {getUsers};
export default usersSlice.reducer;
