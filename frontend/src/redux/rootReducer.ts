import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import loadingReducer from "@/redux/slices/loadingSlice";
import adminReducer from "@/redux/slices/adminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
