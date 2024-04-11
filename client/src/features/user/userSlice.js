import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
  fetchAllUsers,
  deleteUser
} from './userAPI';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset:false,
  userInfo: null,
  users: [],
  
 
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'backend/user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'backend/user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'backend/user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  'backend/users/users/fetchAllUser',
  async () => {
    const response = await fetchAllUsers();
    return response.data
  }
)



export const deleteUserAsync = createAsyncThunk(
  'backend/users/users/deleteUser',
  async (userId) => {
    const response = await  deleteUser(userId);
    return response.data
    } 
  
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;     })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload; // Update state with fetched users
  
      })
      // Handle delete user pending state
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Handle delete user success state
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const deletedUserId = action.meta.arg; // Assuming you pass userId as payload
        state.users = state.users.filter(user => user.id !== deletedUserId);
      })
      // Handle delete user error state
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectUsers = (state) => state.user.users;
export const deleteUsers = (state) => state.user.users;


export const { increment } = userSlice.actions;

export default userSlice.reducer;
