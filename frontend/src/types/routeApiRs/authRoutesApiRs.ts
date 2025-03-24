import { User } from "@/redux/slices/authSlice";

export type LogInApiRs = { message: string; data: { user: Omit<User, "emailId"> } };

export type CheckUserApiRs = { message: string; data?: { user: User } };
