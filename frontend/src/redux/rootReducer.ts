import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "@/redux/slices/loadingSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
