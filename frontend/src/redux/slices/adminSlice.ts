import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Admin = {
  id: number;
  emailId: string;
};

interface AdminState {
  authAdmin: Admin | null;
}

const initialState: AdminState = {
  authAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin | null>) {
      state.authAdmin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
