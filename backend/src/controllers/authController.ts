
import type { NextFunction, Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../config/database/prisma.js"
import crypto from "crypto";


import type { TokenPayload } from "../types/index.js";
import { signAccessToken, signRefreshToken } from "../utils/token.js";



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req?.body;

  if (!email || !password)
    return res.status(404).json({ message: "email and password are required" });
const userModel=await prisma.user;
  const foundUser = await userModel.findUnique({where:{email}})
  //.populate("organisation","_id name").exec();

  if (!foundUser || !foundUser.passwordHash)
    return res.status(409).json({ message: "incorrect email or password" });
  if(!foundUser.isActive){
     return res.status(409).json({ message: "account is non active" });
  }
  const compare = await bcrypt.compare(password.trim(), foundUser.passwordHash.trim());
  if (!compare)
    return res.status(409).json({ message: "incorrect email or password" });

  const accessToken = signAccessToken(foundUser);
  const refreshToken = signRefreshToken(foundUser);

  const hashed = crypto.createHash("sha256").update(refreshToken).digest("hex");
  //console.log("login token :", hashed);
  //foundUser.refreshTokens.push(hashed);
  const returnUser=await userModel.update({where:{id:foundUser.id},data:{refreshTokens:[...foundUser.refreshTokens,hashed]},omit:{passwordHash:true}})

  
  {
    const secure = process.env.NODE_ENV === "production";
    const cookieOpts: any = {
      httpOnly: true,
      secure,
      sameSite: secure ? "none" : "lax",
      path: "/",
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN_NUMBER) ||
        7 * 24 * 60 * 60 * 1000,
    };
    console.debug("Setting refresh cookie (login) opts:", cookieOpts);
    res.cookie("refreshToken", refreshToken, cookieOpts);
  }

  
  return res.status(200).json(returnUser);
};

export const getUserProfile = async (
  req: Request,
  res: Response,

) => {
  try {
    const userModel=await prisma.user;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(409).json("un authorized");
    const { userId } = (await jwt.decode(token)) as TokenPayload;
    if (!userId) {
      return res.status(409).json({ message: "user id is required!!" });
    }
    
    const user = await userModel.findUnique({where:{id:userId},omit:{passwordHash:true}}) 
    //   .findById(userId)
    //   .select("-password").populate("organisation")
    //   .lean()
    //   .exec();
    if (!user)
      return res.status(404).json({ message: "there is no user with such id" });

    return res.status(200).json({message:"success",data:user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error, ", error });
  }
};

// export const updateUserProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId, name, email, password, profileImageUrl, role } = req.body;
//     if (!userId)
//       return res.status(404).json({ message: "user id is required!" });
//     const user = await userModel
//       .findById(userId)
//       .select("-password")
//       .lean()
//       .exec();
//     if (!user)
//       return res
//         .status(404)
//         .json({ message: "there is no such user with this id" });
//     let newName = user.name,
//       newEmail = user.email,
//       newProfileImageUrl = user.organisation,
//       newRole = user.role,
//       newPassword = null;
//     if (name) {
//       const foundUser = await userModel.findOne({ name }).lean().exec();
//       if (foundUser)
//         return res
//           .status(409)
//           .json({ message: "this name is already taken!!!" });
//       newName = name;
//     }
//     if (email) {
//       const foundUser = await userModel.findOne({ email }).lean().exec();
//       if (foundUser)
//         return res
//           .status(409)
//           .json({ message: "this email is already taken!!!" });
//       newEmail = email;
//     }
//     if (profileImageUrl) newProfileImageUrl = profileImageUrl;
//     if (role) newRole = role;
//     if (password) {
//       const hashPass = await bcrypt.hash(password, 10);
//       newPassword = hashPass;
//     }
//     const newUser = await userModel.findByIdAndUpdate(userId, {
//       name: newName,
//       email: newEmail,
//       profileImageUrl: newProfileImageUrl,
//       role: newRole,
//       password: newPassword,
//     });

//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "server error, ", error });
//   }
// };

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const userModel=await prisma.user;
   // console.log("refreshing")
    if (!req.cookies)
      return res.status(462).json({ messsage: "there is no cookies" });
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(462).json({ messsage: "there is no refresh token" });

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
    //const payload = jwt.decode(token);

    const user = await userModel.findUnique({where:{id:(payload as TokenPayload).userId}})
    //findById((payload as TokenPayload).userId);
    if (!user){
      clearCookies(res);
       return res.status(401).json({ message: "invalid refresh token" });
    }
     
    const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");

    // user.refreshTokens.forEach((r) =>
    //   console.log(r.token, " | ", hashedtoken, " = ", r.token === hashedtoken)
    // );
    const idx = user.refreshTokens.findIndex((rt) => rt === hashedtoken);
   // console.log("index of token ========",idx);
    
    if (idx === -1) {
      
    const returnRefreshToken=  user.refreshTokens.splice(0, user.refreshTokens.length-1);
     // await user.save();
   await userModel.update({where:{id:user.id},data:{refreshTokens:returnRefreshToken}})

  // Remove refresh cookie from client
  clearCookies(res);
      return res.status(403).json({ msg: "Reuse detected" });
    }
    user.refreshTokens.splice(idx, 1);
    const newRefreshToken = signRefreshToken(user);
    const newHashhedtoken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
      const returnUser=await userModel.update({where:{id:user.id},data:{refreshTokens:[...user.refreshTokens,newHashhedtoken]}})
    
    const accessToken = signAccessToken(user);

    // Set new refresh cookie (replace previous)
    {
      const secure = process.env.NODE_ENV === "production";
      const cookieOpts: any = {
        httpOnly: true,
        secure,
        sameSite: secure ? "none" : "lax",
        path: "/",
        maxAge:
          Number(process.env.REFRESH_TOKEN_EXPIRES_IN_NUMBER) ||
          7 * 24 * 60 * 60 * 1000,
      };
      console.debug("Setting refresh cookie (refresh) opts:", cookieOpts);
      res.cookie("refreshToken", newRefreshToken, cookieOpts);
    }

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    clearCookies(res);
    return res.status(462).json({ message: "invalid refresh token" });
  }
};
export const logout = async (req: Request, res: Response) => {
    const userModel=await prisma.user;
  const token = req.cookies.refreshToken;
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
  if (token) {
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const secure = process.env.NODE_ENV === "production";
    const clearOpts: any = {
      httpOnly: true,
      secure,
      sameSite: secure ? "none" : "lax",
      path: "/",
    };
    res.clearCookie("refreshToken", clearOpts);
    // Remove this hashed token from all users (or current user)
    const foundUser=await userModel.findUnique({where:{id:(payload as TokenPayload).userId}});
    if(!foundUser){

        return res.status(404).json({message:"no user with such id"})
    }
    const returnUser=await userModel.update({where:{id:foundUser.id},data:{refreshTokens:foundUser.refreshTokens.filter(rt=>rt!==hashed)}})
   
  }

  
    
  
  res.sendStatus(204);
};
const clearCookies=(res:Response)=>{
  const secure = process.env.NODE_ENV === "production";
    const clearOpts: any = {
      httpOnly: true,
      secure,
      sameSite: secure ? "none" : "lax",
      path: "/",
    };
    res.clearCookie("refreshToken", clearOpts);
}