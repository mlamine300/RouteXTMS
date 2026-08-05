import type{ Request, Response } from 'express';
import { prisma } from '../config/database/prisma.js';
import { formatLicenceNumber } from '../utils/index.js';

export const createVehicle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {fleetNumber,plateNumber,vin,make,model,year,type,fuelType,
           maxPayloadKg,maxVolumeM3,euroPalletCap,grossWeightKg,curbWeightKg}=req?.body; 
           if(!fleetNumber||!plateNumber||!make||!model||!year||!type||!fuelType||!maxPayloadKg||!maxVolumeM3){
            return res.status(400).json({success:false,message:"fleetNumber,plateNumber,make,model,year,type,fuelType, maxPayloadKg,maxVolumeM3 are required!!"})
           }
     const  {
isRefrigerated,tempMinCelsius,tempMaxCelsius,hasTailLift,hasHazardousAdr,insuranceNumber,
insuranceExpiresAt,inspectionExpiresAt,tachographExpiresAt,currentOdometerKm,telematicsDeviceId} =req.body;
let foundTruckFieldTocheck=[{plateNumber}] as any[]
if(vin&&vin.length>0)foundTruckFieldTocheck.push({vin})
if(telematicsDeviceId&&telematicsDeviceId.length>0)foundTruckFieldTocheck.push({telematicsDeviceId})
const foundTruck=await prisma.vehicle.findMany({where:{OR:foundTruckFieldTocheck}});
if(foundTruck&&foundTruck.length>0)return res.status(400).json({success:false,message:"a Vehicle with such plateNumber or vin or telematicsDeviceId already exist thoes values should be unique"})
    
const createdTruck=await prisma.vehicle.create({data:{fleetNumber,plateNumber,vin,make,model,year,type,fuelType,
           maxPayloadKg,maxVolumeM3,euroPalletCap,grossWeightKg,curbWeightKg,isRefrigerated,tempMinCelsius,tempMaxCelsius,hasTailLift,hasHazardousAdr,insuranceNumber,
insuranceExpiresAt,inspectionExpiresAt,tachographExpiresAt,currentOdometerKm,telematicsDeviceId:telematicsDeviceId&&telematicsDeviceId.length>0?telematicsDeviceId:null}})

if(createdTruck&&createdTruck.id)return res.status(200).json({success:true,message:"vehicle created successfully!!!",data:createdTruck});

    return res.status(400).json({ message: 'Vehicle created successfully' });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to create Vehicle' });
  }
};

export const  updateVehicle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this query"});
    const foundTruck=await prisma.vehicle.findFirst({where:{id}});
    if(!foundTruck||!foundTruck.id)return res.status(404).json({message:"there is no truck with such id"});
     const reqBody=req.body;
     let fieldsTocheck : any[]=[]  ;
     if(reqBody.plateNumber)fieldsTocheck.push({plateNumber:formatLicenceNumber(reqBody.plateNumber)}) ; 
     if(reqBody.vin)fieldsTocheck.push({vin:formatLicenceNumber(reqBody.vin)}) ;
    
     if(fieldsTocheck.length>0){
     const duplicateTruck=await prisma.vehicle.findFirst({where:{AND:[{NOT:{id:foundTruck.id}},{OR:fieldsTocheck}]}})
     if(duplicateTruck&&duplicateTruck.id)return res.status(409).json({message:"you can't update truck, information you provided exist on another truck"})
     }
    const result=await prisma.vehicle.update({where:{id},data:reqBody})
    if(result&&result.id)
    return res.status(200).json({message:"success",data:result})
    
    return res.status(400).json({success:false,error:"Failed to update Vehicle"})

  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to update Vehicle' });
  }
};

export const deleteVehicle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
if(!id)return res.status(400).json({message:"id is required for this query"});
const foundTruck=await prisma.vehicle.findFirst({where:{id}});
if(!foundTruck||!foundTruck.id)return res.status(404).json({message:"there is no truck with such id"});
await prisma.vehicle.update({where:{id},data:{isActive:false,status:"OUT_OF_SERVICE" ,deletedAt:new Date()}})
  return  res.status(200).json({ message: 'truck deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete Vehicle' });
  }
};

export const getVehicles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limit=Math.abs(req?.body?.limit)||10;
    const skip=Math.abs(req?.body?.skip)||0;

    const trucks=await prisma.vehicle.findMany({orderBy:{createdAt:"asc"},skip:skip,take:limit})
    if(!trucks)return res.status(404).json({message:"there is no drivers with such a query"});
   return res.status(200).json({message:"success",data:trucks})
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to fetch Vehicles' });
  }
};

export const getVehicleById = async (req: Request, res: Response): Promise<Response> => {
  try {
     const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this query"});
const foundTruck=await prisma.vehicle.findFirst({where:{id,deletedAt:null}});
if(!foundTruck)return res.status(404).json({message:"there is no truck with such id"})

    return res.status(200).json({message:"success",data:foundTruck});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to fetch Vehicle' });
  }
};

export const searchVehicle=async (req:Request,res:Response):Promise<Response>=>{
  try {
    const limit=req.body?.limit||10;
    const skip=req.body?.skip||0;
    const status=req.body?.status;
    const type=req.body?.type;
    const fuelType=req.body?.fuel;
    const trailer=req.body?.trailer;
    const search=req.body?.search;
    const orderBy=req.body?.orderBy||"createdAt";
    const orderOrientation=req.body?.orderOrientation||"desc";

    let filter=[];
    if(status)filter.push({status});
    if(type)filter.push({type})
    if(fuelType)filter.push({fuelType});
    if(trailer)filter.push({attachedTrailer: {
      type: trailer, 
    },})
    
    if(search)filter.push({OR:[{vin:{contains:search}},{fleetNumber:{contains:search}},{plateNumber:{contains:search}},{make:{contains:search}},{model:{contains:search}}]})

    const trucks=await prisma.vehicle.findMany({take:limit,skip,where:{AND:filter},orderBy:{[orderBy]:orderOrientation},include: {
    attachedTrailer: true,
    driver: true,
  }});
    return res.status(200).json({message:"success",data:trucks});

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error,message:"Server Error, failed to get trucks"})
  }
}