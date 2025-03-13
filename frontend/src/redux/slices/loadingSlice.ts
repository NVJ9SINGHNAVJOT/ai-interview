import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  siteLoading: boolean;
}

const initialState: LoadingState = {
  siteLoading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setSiteLoading(state, action: PayloadAction<boolean>) {
      state.siteLoading = action.payload;
    },
  },
});

export const { setSiteLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
