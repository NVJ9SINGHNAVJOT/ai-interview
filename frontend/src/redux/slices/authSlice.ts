import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  authUser: boolean;
}

const initialState = {
  loading: false,
  authUser: false,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthUser(state, action: PayloadAction<boolean>) {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthLoading, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
