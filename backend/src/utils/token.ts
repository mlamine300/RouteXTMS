
import jwt from "jsonwebtoken";
import type { UserGetPayload } from "../../generated/prisma/models.js";




 
export const signAccessToken = (user: Omit<UserGetPayload<null>,'passwordHash'>) => {
  return jwt.sign(
   { userId: user.id, role: user.roleId ,firstName:user.firstName,lastName:user.lastName,email:user.email,username:user.username,
    activeStatus:user.isActive
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "30s",
    } as jwt.SignOptions
  );
};

export const signRefreshToken = (user: any) => {
  return jwt.sign(
   { userId: user.id, role: user.roleId ,firstName:user.firstName,lastName:user.lastName,email:user.email,username:user.username,
    activeStatus:user.isActive
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    } as jwt.SignOptions
  );
};
