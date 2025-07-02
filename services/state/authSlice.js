import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },

  reducers: {
    setUser: function (state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logoutUser: function (state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
