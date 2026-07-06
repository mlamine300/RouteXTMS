import type { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
  firstName:string;
  lastName:string;
  email:string;
  username:string;
  activeStatus:boolean;
  iat?: number;
  exp?: number;
}