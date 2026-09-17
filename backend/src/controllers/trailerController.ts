import type{ Request, Response } from 'express';
import { prisma } from '../config/database/prisma.js';
import { formatLicenceNumber } from '../utils/index.js';

export const createTrailer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {fleetNumber,plateNumber,vin,make,model,year,type,status,assignedParcId,maxPayloadKg,
      maxVolumeM3,euroPalletCap,internalHeightMeters,grossWeightKg,isRefrigerated,
      reeferEngineHours,tempMinCelsius,tempMaxCelsius,hasTailLift,hasHazardousAdr,
      isDoubleDeck,insuranceNumber,insuranceExpiresAt,inspectionExpiresAt,atpExpiresAt,
      telematicsDeviceId,currentLat,currentLng,currentTractorId
}=req.body;
if(!plateNumber||!vin||!make||!model||!year||!type||!status||
  !assignedParcId||!maxPayloadKg||!maxVolumeM3) return res.status(400).json({message:"plateNumber, vin, make, model, year, type, status, assignedParcId, maxPayloadKg, maxVolumeM3 are required!!!"})
 
let foundTrailerFieldTocheck=[{plateNumber},{vin}] as any[];
if(telematicsDeviceId&&telematicsDeviceId.length>0)foundTrailerFieldTocheck.push({telematicsDeviceId})

 const foundTrailer=await prisma.trailer.findFirst({where:{OR:foundTrailerFieldTocheck}});
 if(foundTrailer && foundTrailer.id)return res.status(400).json({message:"trailer with such plate Number, vin or telematics id already exist"})

  const newTrailer=await prisma.trailer.create({data:{fleetNumber:formatLicenceNumber(fleetNumber),plateNumber:formatLicenceNumber(plateNumber),vin:formatLicenceNumber(vin),make,model,year,type,status,assignedParcId,maxPayloadKg,
      maxVolumeM3,euroPalletCap,internalHeightMeters,grossWeightKg,isRefrigerated,
      reeferEngineHours,tempMinCelsius,tempMaxCelsius,hasTailLift,hasHazardousAdr,
      isDoubleDeck,insuranceNumber,insuranceExpiresAt,inspectionExpiresAt,atpExpiresAt,
      telematicsDeviceId,currentLat,currentLng,currentTractorId
}})
if(newTrailer&&newTrailer.id) return res.status(201).json({ message: 'trailer created successfully' });

return res.status(400).json({message :"could not create trailer!!!!!!"})
 
 
  
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Failed to create trailer',error });
  }
};

export const updateTrailer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const trailerId=req.params.id as string;
    if(!trailerId)return res.status(400).json({message:"id is required for this request!!!!!!"})
      const foundTrailer=await prisma.trailer.findUnique({where:{id:trailerId}})
    if(!foundTrailer)return res.status(404).json({message:"there is no trailer with such id"});

    const reqBody=req.body;
    console.log(reqBody)
         let fieldsTocheck : any[]=[]  ;
         if(reqBody.plateNumber)fieldsTocheck.push({plateNumber:formatLicenceNumber(reqBody.plateNumber)}) ; 
         if(reqBody.fleetNumber)fieldsTocheck.push({fleetNumber:reqBody.fleetNumber}) ; 
         if(reqBody.vin)fieldsTocheck.push({vin:formatLicenceNumber(reqBody.vin)}) ;
          if(reqBody.telematicsDeviceId)fieldsTocheck.push({telematicsDeviceId:reqBody.telematicsDeviceId})
         if(fieldsTocheck.length>0){
         const duplicateTrailer=await prisma.trailer.findFirst({where:{AND:[{NOT:{id:foundTrailer.id}},{OR:fieldsTocheck}]}})
         if(duplicateTrailer&&duplicateTrailer.id)return res.status(409).json({message:"you can't update trailer, information you provided exist on another trailer"})
         }
        const result=await prisma.trailer.update({where:{id:foundTrailer.id},data:reqBody})
        if(result&&result.id)
        return res.status(200).json({message:"trailer updated successfully",data:result})
        
   return res.status(400).json({ message: 'could not update trailer' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update trailer' });
  }
};

export const deleteTrailer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this request!!"})
      const foundTrailer=await prisma.trailer.findFirst({where:{id}});
    if(!foundTrailer)return res.status(404).json({message:"there is no trailer with such id!!!"})
      const truckWithTrailer=await prisma.vehicle.findFirst({where:{attachedTrailerId:id}})
    if(truckWithTrailer&&truckWithTrailer.id)return res.status(400).json({message:"this trailer is attached to a vehicule please make sure trailer in not in opération before delete it!!!"})

      const updatedTrailer=await prisma.trailer.update({where:{id},data:{deletedAt:new Date()}});
      if(updatedTrailer&&updatedTrailer.id &&updatedTrailer.deletedAt)return res.status(200).json({message:"trailer delete successufully"})
   return res.status(400).json({ message: 'could not delete trailer' });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to delete trailer' });
  }
};

export const getTrailers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limit=Math.abs(req?.body?.limit)||10;
    const skip=Math.abs(req?.body?.skip)||0;
    const trailers=await prisma.trailer.findMany({where:{deletedAt:null},skip,take:limit})
    return res.status(200).json({data:trailers});
  
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to fetch trailers' });
  }
};

export const getTrailerById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this request!!!"})
     const foundTrailer=await prisma.trailer.findFirst({where:{id}}) 
    if(!foundTrailer||!foundTrailer.id) return res.status(404).json({message:"there is no trailer with such id!!!!"})
   return res.status(200).json({ data: foundTrailer });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to fetch trailer' });
  }
};

export const searchTrailers=async (req:Request,res:Response):Promise<Response>=>{
  try {
    const limit=req.body?.limit||10;
    const skip=req.body?.skip||0;
    const search=req.body?.search;
    const type=req.body?.type;
    const status=req.body?.status;
    const parc=req.body?.parc;
    const isDoubleDeck=req.body?.isDoubleDeck;
    const isRefrigerated=req.body?.isRefrigerated;
    const orderBy=req.body?.orderBy||"createdAt";
    const orderOrientation=req.body?.orderOrientation||"desc";
 let filter=[];
 if(search){
  filter.push({OR:[{vin:{contains:search}},{telematicsDeviceId:{contains:search}},{plateNumber:{contains:search}},{make:{contains:search}},{model:{contains:search}}]})
 }
 if(type)filter.push({type});
 if(status)filter.push({status});
 if(parc)filter.push({parc});
 if(isDoubleDeck)filter.push({isDoubleDeck});
 if(isRefrigerated)filter.push({isRefrigerated});
 
 const trailers=await prisma.trailer.findMany({take:limit,skip,where:{AND:filter},orderBy:{[orderBy]:orderOrientation},include: {
   
    
   
  assignedParc: {
    select: {
      name: true,

    }}
  }})
  

 return res.status(200).json({message:"success",data:trailers})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"unable to get this request!!",error})
  }
}