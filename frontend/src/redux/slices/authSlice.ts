import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthState {
  loading: boolean;
  authUser: boolean;
  user: User | null;
}

const initialState = {
  loading: false,
  authUser: false,
  user: null,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      if (action.payload === null) {
        state.authUser = false;
        state.user = null;
        return;
      }
      state.user = action.payload;
      state.authUser = true;
    },
  },
});

export const { setAuthLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
