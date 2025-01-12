import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  siteLoading: boolean;
}

const initialState = {
  siteLoading: true,
} satisfies LoadingState as LoadingState;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setSiteLoading(state, action: PayloadAction<boolean>) {
      state.siteLoading = action.payload;
    },
  },
});

export const { setSiteLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
