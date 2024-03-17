import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? true;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signInFailure, updateCurrentUser, signOut } =
  userSlice.actions;
export default userSlice.reducer;
