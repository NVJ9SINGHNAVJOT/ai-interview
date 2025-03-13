import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/redux/slices/authSlice";

interface AdminState {
  authAdmin: User | null;
}

const initialState: AdminState = {
  authAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<User | null>) {
      state.authAdmin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
