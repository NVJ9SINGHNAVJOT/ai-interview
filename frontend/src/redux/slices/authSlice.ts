import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
};

interface AuthState {
  authLoading: boolean;
  authUser: User | null;
}

const initialState: AuthState = {
  authLoading: false,
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.authLoading = action.payload;
    },
    setAuthUser(state, action: PayloadAction<User | null>) {
      if (action.payload === null) {
        state.authUser = null;
        state.authLoading = false;
        return;
      }
      state.authUser = action.payload;
    },
  },
});

export const { setAuthLoading, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
