import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import loadingReducer from "@/redux/slices/loadingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
