import { CustomPayload } from "@/types/custom";
import jwt from "jsonwebtoken";

export const jwtVerify = (token: string) => {
  // decode token
  const decoded = jwt.verify(token, `${process.env["JWT_SECRET"]}`) as CustomPayload;

  return decoded.id;
};
