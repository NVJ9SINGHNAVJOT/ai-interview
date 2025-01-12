import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface CustomPayload extends JwtPayload {
  id: number;
}

export interface CustomRequest extends Request {
  requestId: string;
  userId: number;
}
