import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: number;
  isLogin: boolean;
}

const initialState: AuthState = {
  value: 0,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;
