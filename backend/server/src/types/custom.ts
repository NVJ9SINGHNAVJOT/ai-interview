import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface CustomPayload extends JwtPayload {
  userId?: string;
}

export interface CustomRequest extends Request {
  requestId: string;
  userId: number;
}
