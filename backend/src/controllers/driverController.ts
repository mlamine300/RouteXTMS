import type{ Request, Response } from 'express';
import { prisma } from '../config/database/prisma.js';
import { formatEmail, formatLicenceNumber, formatName, formatPhoneNumber } from '../utils/index.js';
export const createDriver = async (req: Request, res: Response): Promise<Response> => {
  try {

    const {assignedParcId,firstName,lastName,phone,email,isEmployee,employeeId,licenseNumber
        ,LicenseCategory,licenseExpiresAt,medicalCheckExpiresAt,fimoExpiresAt,
        status,isActive
      
    }=req.body;

    const fPhone=formatPhoneNumber(phone);
    const fLicenceNumbre=formatLicenceNumber(licenseNumber)
    const fFirstName=formatName(firstName)
    const fLastName=formatName(lastName)
    const fEmail=email?formatEmail(email):null
    let duplicateFields=[{phone:fPhone},{licenseNumber:fLicenceNumbre}] as any[];
    if(fEmail&&fEmail.length>3){
duplicateFields.push({email:fEmail})
    }
    
    if(assignedParcId||!fFirstName||!fLastName||!fPhone||!fLicenceNumbre)return res.status(400).json({message:"parc, firsName, LastName, phone and Licence Number is needed to create a driver"})
   const foundDriver=await prisma.driver.findFirst({where:{OR:duplicateFields}});
if(foundDriver&&foundDriver.id)return res.status(400).json({message:"a driver with phone | licence | email number already exist"})

    const dLicenseExpiresAt=new Date(licenseExpiresAt)||new Date("2999-12-30")
    const dMedicalCheckExpiresAt=new Date(medicalCheckExpiresAt)||new Date("2999-12-30")
    const dFimoExpiresAt=new Date(fimoExpiresAt)||new Date("2999-12-30")
   
    const result=await prisma.driver.create({data:{assignedParcId,firstName:fFirstName,lastName:fLastName,phone:fPhone,email,isEmployee,employeeId,licenseNumber:fLicenceNumbre
        ,LicenseCategory,licenseExpiresAt:dLicenseExpiresAt,medicalCheckExpiresAt:dMedicalCheckExpiresAt,fimoExpiresAt:dFimoExpiresAt,
        status:status||'AVAILABLE',isActive:isActive||true}});
        if(result&&result.id)
        return res.status(201).json({ message: 'Driver created successfully',data:result });

        return res.status(400).json({message:"Failed to create Driver"});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to create Driver' });
  }
};

export const updateDriver = async (req: Request, res: Response): Promise<Response> => {
  try {
const id=req.params.id as string;
if(!id)return res.status(400).json({message:"id is required for this query"});
const foundDriver=await prisma.driver.findFirst({where:{id,deletedAt:null}});
if(!foundDriver||!foundDriver.id)return res.status(404).json({message:"there is no driver with such id"});
 const reqBody=req.body;
 let fieldsTocheck : any[]=[]  ;
 if(reqBody.phone)fieldsTocheck.push({phone:formatPhoneNumber(reqBody.phone)}) ; 
 if(reqBody.licenseNumber)fieldsTocheck.push({licenseNumber:formatLicenceNumber(reqBody.licenseNumber)}) ;
  if(reqBody.email)fieldsTocheck.push({email:formatEmail(reqBody.email)}) ; 
 if(fieldsTocheck.length>0){
 const duplicateDriver=await prisma.driver.findFirst({where:{AND:[{NOT:{id:foundDriver.id}},{OR:fieldsTocheck}]}})
 if(duplicateDriver&&duplicateDriver.id)return res.status(409).json({message:"you can't update driver, information you provided exist on another driver"})
 }
const result=await prisma.driver.update({where:{id},data:reqBody})

return res.status(200).json({message:"success",data:result})
  
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ error: 'Failed to update Driver' });
  }
};

export const deleteDriver = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
if(!id)return res.status(400).json({message:"id is required for this query"});
const foundDriver=await prisma.driver.findFirst({where:{id,deletedAt:null}});
if(!foundDriver||!foundDriver.id)return res.status(404).json({message:"there is no driver with such id"});
await prisma.driver.update({where:{id},data:{isActive:false,status:"INACTIVE",deletedAt:new Date()}})
  return  res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ error: 'Failed to delete Driver' });
  }
};

export const getDrivers = async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const limit=Math.abs(req?.body?.limit)||10;
    const skip=Math.abs(req?.body?.skip)||0;

    const drivers=await prisma.driver.findMany({where:{deletedAt:null},orderBy:{createdAt:"asc"},skip:skip,take:limit})
    if(!drivers)return res.status(404).json({message:"there is no drivers with such a query"});
   return res.status(200).json({message:"success",data:drivers})

  } catch (error) {
    console.error(error);
  return  res.status(500).json({ error: 'Failed to fetch Drivers' });
  }
};

export const searchDrivers=async (req:Request,res:Response):Promise<Response>=>{
  try {
    const limit=req.body?.limit||10;
    const skip=req.body?.skip||0;
    const status=req.body?.status;
    const licenseCategories=req.body?.licenseCategories;
    const search=req.body?.search;
    const orderBy=req.body?.orderBy||"createdAt";
    const orderOrientation=req.body?.orderOrientation||"desc";
    const assignedParcId=req.body?.assignedParcId

    let filter=[];
    if(status)filter.push({status});
     if(assignedParcId)filter.push({assignedParcId});
    if(licenseCategories&&licenseCategories.length>0)filter.push({licenseCategories:{hasSome:licenseCategories}});
    if(search)filter.push({OR:[{licenseNumber:{contains:search}},{phone:{contains:search}},{firstName:{contains:search}},{lastName:{contains:search}}]})
  console.log(JSON.stringify(filter))
    const drivers=await prisma.driver.findMany({take:limit,skip,where:{AND:filter},orderBy:{[orderBy]:orderOrientation}, include: {
  assignedParc: {
    select: {
      id: true,
      name: true,
      positionLat: true,
      positionLng: true,
    },
    
  },
  assignedVehicle:{select:
    {
      id:true,
      make:true,
      model:true,
      plateNumber:true
  }}
}});
    return res.status(200).json({message:"success",data:drivers});

    return res.status(200)
  } catch (error) {
    console.log(error);
    return res.status(500).json({error,message:"Server Error, failed to get Drivers"})
  }
}

export const getDriverById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this query"});
const foundDriver=await prisma.driver.findFirst({where:{id,deletedAt:null}});
if(!foundDriver)return res.status(404).json({message:"there is no driver with such id"})

    return res.status(200).json({message:"success",data:foundDriver});

  } catch (error) {
    console.error(error);
 return   res.status(500).json({ error: 'Failed to fetch Driver' });
  }
};