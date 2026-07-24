import type{ Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { prisma } from "../config/database/prisma.js";
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    if(!req.body)return res.status(400).json({message:"no body in the request"})
    const {
    firstName,
    lastName,
    email,
    username,
    password,
    roleId}=req.body;
    if(!firstName||!lastName||!email||!username||!password||!roleId){
      return res.status(400).json({message:"first name, last name, email ,user name, password and role are required"})
    }
    const foundUsers=await prisma.user.findMany({where:{OR:[{email},{username}]}})
    if(foundUsers.length>0)return res.status(400).json({message:"user with this email/username already exist"});

          const passwordHash = await bcrypt.hash(password, 10);
   const newUser = await prisma.user.create({
     data: {
       firstName,
       lastName,
       email,
       username,
       passwordHash,
       roleId,
     },
   });
   if(!newUser||!newUser.id){

    return res.status(400).json({message:"error creating new user"})

    
   }

    res.status(201).json({ message: 'User created successfully',data:newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create User' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    if(!req.body)return res.status(400).json({message:"there is no body in the request"})
      const id:string=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required"});
      const foundUser=await prisma.user.findUnique({where:{id}})
      if(!foundUser)return res.status(404).json({message:"there is no user with such id"});
      const data=req.body;
      if(data.username||data.email){
        const foundUsers=await prisma.user.findMany({where:{AND:[{NOT:{id}},{OR:[{username:data.username},{email:data.email}]}]}});
        if(foundUsers&&foundUsers.length>0)return res.status(400).json({message:"we can't use this username/email because it has been used"})
      }
    if(data.password){
      data.passwordHash=await bcrypt.hash(data.password,10);
      data.passwordChangedAt=new Date();
      delete data.password
    }
      
  
      const newUSer=await prisma.user.update({where:{id},data})
    res.status(200).json({ message: 'User updated successfully' , data:newUSer});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update User' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {


    
      const id:string=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required"});
      const foundUser=await prisma.user.findUnique({where:{id},omit:{passwordHash:true}})
      if(!foundUser)return res.status(404).json({message:"there is no user with such id"});
      const deletedUser=await prisma.user.update({where:{id},data:{deletedAt:new Date(),isLocked:true}})

    res.status(200).json({ message: 'User deleted successfully',data:deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete User' });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const skip=req?.body?.skip||0;
    
    const take=req?.body?.limit||10;
    const orderBy=req?.body?.orderBy||{createdAt: "desc"};

    const foundUsers=await prisma.user.findMany({skip,take,orderBy,omit:{passwordHash:true}});
      if(!foundUsers)return res.status(404).json({message:"there is no users "});
      
    res.status(200).json({message:"success", data: foundUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
       const id:string=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required"});
      const foundUser=await prisma.user.findUnique({where:{id}})
      if(!foundUser)return res.status(404).json({message:"there is no user with such id"});
      if(foundUser.passwordHash) delete (foundUser as any).passwordHash;
    res.status(200).json({message:"success", data: foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch User' });
  }
};

export const SeedUser=async({firstName,lastName,email,username,password,roleId}:{firstName:string,lastName:string,email:string,username:string,password:string,roleId:string})=>{
  const foundUser=await prisma.user.findFirst({where:{OR:[{email:email},{username:username}]}});  
  if(foundUser&&foundUser.id)throw new Error("user exist")  
  const passwordHash = await bcrypt.hash(password, 10);
        

   const newUser = await prisma.user.create({
     data: {
       firstName,
       lastName,
       email,
       username,
       passwordHash,
       roleId,
     },
   });
    console.log(`useer ${username} has been created succesufly`);
}