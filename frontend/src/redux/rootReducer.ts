import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
