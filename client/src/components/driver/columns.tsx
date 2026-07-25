/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import type { ColumnDef } from "@tanstack/react-table"
import type { CSSProperties } from "react"

import {  Pen} from "lucide-react";
import type{Driver} from "../../types/index"

import { SheetTrigger } from "../ui/sheet";
import { differenceInDays, format } from "date-fns";





export const columns:({setdriverToEdit}:{setdriverToEdit:any})=> ColumnDef<Driver>[] =({setdriverToEdit})=> [
  {accessorKey:"driver",
   header: "Chauffeur",
    
    cell:({row})=>{
      const r=row.original;
    const userName=`${r.firstName} ${r.lastName}`
    const phoneNumber=r.phone;
      return <div className="flex flex-col items-center" >
        <p className="italic font-semibold ">
        {userName}
      </p>
      <p className="w-10/12 mx-auto bg-gray-cold/80 h-px"></p>
      <p  className="italic text-xs">
        {phoneNumber}
      </p>
      </div>
      
    }

  }
  ,
    {accessorKey:"licences",
   header: "Permis",
    
    cell:({row})=>{
      const r=row.original;
   const licencesCategories=r.licenseCategories.join(" - ");
   const licenceNumber=r.licenseNumber;
  
      return <div className="flex flex-col items-center" >
        <p className="italic text-sm font-semibold">
        {licenceNumber}
      </p>
      <p className="w-10/12 mx-auto bg-gray-cold/80 h-px"></p>
      <p className="italic text-lg font-extrabold">
        {licencesCategories}
      </p>
      </div>
      
    }

  }
  ,

     {accessorKey:"status",
   header: "Status",
    
    cell:({row})=>{
    const statusStyle: Record<string, CSSProperties> = {
      AVAILABLE: {backgroundColor:"#A6FA8F50", color:"#114403"},
      ON_TRIP: {backgroundColor:"#F8E46350", color:"#9C8807"},
       ON_BREAK:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
        OFF_DUTY:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
         INACTIVE:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"}
    }
  
      return <div className="flex items-center justify-center">
        <p style={statusStyle[row.original.status]||statusStyle.AVAILABLE} className="px-4 py-2 text-sm rounded-lg font-extrabold">

        {row.original.status}
        </p>
         </div>
      
    }

  }
  ,
  {accessorKey:"vehicle",
   header: "Camion",
    
    cell:({row})=>{
    const vehicle=row.original.assignedVehicle;
    if(!vehicle||!vehicle.fleetNumber)return "Pas De Camion"
  //${vehicle.plateNumber}
      return <div className="flex flex-col">
        <p className="text-lg font-semibold">{`${vehicle.make} ${vehicle.model} `} </p>
        <p>{vehicle.plateNumber}</p>
      </div>
      
    }

  }
  ,
      {accessorKey:"licenseExpiresAt",
   header: "Permis expire en",
    
    cell:({row})=>{
    const expireIn=differenceInDays(row.original.licenseExpiresAt,new Date())
    const date=format(row.original.licenseExpiresAt,"yyyy-MM-dd")
    const DateStyle=(days:number)=>{
      if(days<30) return {backgroundColor:"#ff250080",border:"solid #ff2500 2px" , color:"#660000"};
     else if(days<90)return {backgroundColor:"#F8E46380", border:"solid #F8E463 2px", color:"#9C8807"};
     return {};
    }
      return <div style={DateStyle(expireIn)} className="flex flex-col items-center px-4 py-px rounded-lg">
        <p  className="text-lg font-bold">{`${expireIn} jours`} </p>
         <p className="text-xs italic ">{date} </p>
      </div>
      
    }

  },
       {accessorKey:"medicalCheckExpiresAt",
   header: "Visite Méd.",
    
     cell:({row})=>{
    const expireIn=differenceInDays(row.original.medicalCheckExpiresAt,new Date())
    const date=format(row.original.medicalCheckExpiresAt,"yyyy-MM-dd")
    const DateStyle=(days:number)=>{
      if(days<30) return {backgroundColor:"#ff250080",border:"solid #ff2500 2px" , color:"#660000"}
     else if(days<90)return {backgroundColor:"#F8E46380", border:"solid #F8E463 2px", color:"#9C8807"};;
     return {};
    }
      return <div style={DateStyle(expireIn)} className="flex flex-col items-center px-4 py-px rounded-lg">
        <p  className="text-lg font-bold">{`${expireIn} jours`} </p>
         <p className="text-xs italic ">{date} </p>
      </div>
      
    }

  },
       {accessorKey:"fimoExpiresAt",
   header: "Formation",
    
     cell:({row})=>{
    const expireIn=differenceInDays(row.original.fimoExpiresAt,new Date())
    const date=format(row.original.fimoExpiresAt,"yyyy-MM-dd")
    const DateStyle=(days:number)=>{
      if(days<30) return {backgroundColor:"#ff250080",border:"solid #ff2500 2px" , color:"#660000"};
     else if(days<90)return {backgroundColor:"#F8E46380", border:"solid #F8E463 2px", color:"#9C8807"};;
     return {};
    }
      return <div style={DateStyle(expireIn)} className="flex flex-col items-center px-4 py-px rounded-lg">
        <p  className="text-lg font-bold">{`${expireIn} jours`} </p>
         <p className="text-xs italic ">{date} </p>
      </div>
      
    }

  },
  
    
{
  header:"Edit",
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {

      return <SheetTrigger onClick={()=>setdriverToEdit(row.original)}  className="cursor-pointer" >
       <Pen className="text-primary bg-transparent hover:text-primary/50 hover:scale-150"/>
      </SheetTrigger>
              
    },
    
    }
  
  
]