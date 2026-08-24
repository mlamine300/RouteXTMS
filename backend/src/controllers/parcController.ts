import type{ Request, Response } from 'express';
import { prisma } from '../config/database/prisma.js';

export const createParc = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {name,positionLat,positionLng}=req.body;
    if(!name||!positionLat||!positionLng)return res.status(400).json({message:"name and possition are required!!!"});
    const foundParc=await prisma.parc.findFirst({where:{name}});
    if(foundParc&&foundParc.id)return res.status(400).json({message:"a parc with this name already exist try using another name"})
   const parc=await prisma.parc.create({data:{name,positionLat,positionLng}})
      return res.status(201).json({ message: 'Parc created successfully' ,data:parc});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to create Parc' });
  }
};

export const updateParc = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(404).json({message:"there is no parc with such id"});
    const name=req.body?.name;
    const positionLat=req.body?.positionLat;
    const positionLng=req.body?.positionLng;
    const data={} as any;
    if(name){
      const existingParc=await prisma.parc.findFirst({where:{AND:[{NOT:{id}},{name}]}});
      if(existingParc)return res.status(400).json({message:"a parc with this name already exist"})
        data["name"]=name;
    }
    if(positionLat)data["positionLat"]=positionLat;
    if(positionLng)data["positionLng"]=positionLng;
    const newParc=await prisma.parc.update({where:{id},data});
    if(newParc)
   return res.status(200).json({ message: 'Parc updated successfully',data });
  return res.status(400).json({ error: 'Failed to update Parc' });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to update Parc' });
  }
};

export const deleteParc = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this query"})
      const foundParc=await prisma.parc.findFirst({where:{id}})
    if(!foundParc||!foundParc.id)return res.status(400).json({message:"there is no parc with such id"});
    const driver=await prisma.driver.findFirst({where:{assignedParcId:id}});
    if(driver&&driver?.id)return res.status(400).json({messsage:"you can't delete parc it contains drivers, please consider changing drivers assigned parc before deleting"})
    const vehicle=await prisma.vehicle.findFirst({where:{assignedParcId:id}});
    if(vehicle&&vehicle?.id)return res.status(400).json({messsage:"you can't delete parc it contains vehicles, please consider changing vehicle assigned parc before deleting"})
     const trailer=await prisma.trailer.findFirst({where:{assignedParcId:id}});
    if(trailer&&trailer?.id)return res.status(400).json({messsage:"you can't delete parc it contains trailers, please consider changing vehicle assigned parc before deleting"})
   const parc=await prisma.parc.update({where:{id},data:{deletedAt:new Date()}})
   
   
      return res.status(200).json({ message: 'Parc deleted successfully',data:parc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete Parc' });
  }
};

export const getParcs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const parcs=await prisma.parc.findMany({});
  return  res.status(200).json({ data: parcs });
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ error: 'Failed to fetch Parcs' });
  }
};

export const getParcById = async (req: Request, res: Response): Promise<Response> => {
  try {
      const id=req.params.id as string;
    if(!id)return res.status(400).json({message:"id is required for this query"})
      const foundParc=await prisma.parc.findFirst({where:{id}})
    if(!foundParc||!foundParc.id)return res.status(400).json({message:"there is no parc with such id"});
    return res.status(200).json({ data: foundParc });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Failed to fetch Parc' });
  }
};

export const searchParcs=async (req:Request,res:Response):Promise<Response>=>{
try {
  const search=req.body.search;
  const limit=req.body.limit||10;
  const page=req.body.page||1;
  const skip=(page-1)*limit;
  let filter=[];
  filter.push({deletedAt:null})
  if(search)filter.push({name:{contains:search}})
  const parcs=await prisma.parc.findMany({where:{AND:filter},skip,take:limit});

  return res.status(200).json({message:"success",data:parcs})
} catch (error) {
  console.log(error)
  return res.status(500).json({message:"impossible to get parcs",error})
}
}