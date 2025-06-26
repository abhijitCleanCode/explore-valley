import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },

  reducers: {
    setUser: function (state, action) {
      state.user = action.payload;
    },

    logout: function (state) {
      state.user = {};
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
