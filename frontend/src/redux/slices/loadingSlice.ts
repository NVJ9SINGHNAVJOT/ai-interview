import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  profilePageLd: boolean;
}

const initialState = {
  profilePageLd: true,
} satisfies LoadingState as LoadingState;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setProfilePageLoading(state, action: PayloadAction<boolean>) {
      state.profilePageLd = action.payload;
    },
  },
});

export const { setProfilePageLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
