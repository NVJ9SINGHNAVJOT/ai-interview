import { User } from "@/redux/slices/authSlice";

export type SignUpApiRs = { message: string; data: { id: number } };

export type LogInApiRs = { message: string; data: Omit<User, "emailId"> };

export type CheckUserApiRs = { message: string; data?: User };
