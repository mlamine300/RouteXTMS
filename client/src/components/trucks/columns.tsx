/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import type { ColumnDef } from "@tanstack/react-table"
import type { CSSProperties } from "react"
import {   ArrowDown, ArrowUp, ArrowUpDown, Pen} from "lucide-react";
import type{Driver, Vehicle} from "../../types/index"
import { SheetTrigger } from "../ui/sheet";
import { differenceInDays, format } from "date-fns";
import { useSearchParams } from "react-router";






export const columns:({setTruckToEdit}:{setTruckToEdit:any})=> ColumnDef<Vehicle>[] =({setTruckToEdit})=> [
  {accessorKey:"tracteur",
   header:()=> <p className="hidden 2xl:flex">Tracteur ID</p>,
    
    cell:({row})=>{
      const r=row.original;
 
      return <div className="hidden 2xl:flex flex-col items-center" >
        <p className="italic font-semibold text-sm">
        {r.fleetNumber}
      </p>
      <p className="w-10/12 mx-auto bg-gray-cold/80 h-px"></p>
      <p  className="italic text-xs">
        {`Vin : ${r.vin}`}
      </p>
      </div>
      
    }

  }
  ,
    {accessorKey:"model",
      
   header:()=> <p className="text-xs">Model</p>,
    
    cell:({row})=>{
      const r=row.original;
 
  
      return <div className="flex flex-col items-center" >
        <p className="italic text-sm font-semibold">
        {r.make}
      </p>
      <p className="w-10/12 mx-auto bg-gray-cold/80 h-px"></p>
      <p className="italic text-sm font-extrabold">
        {`${r.model} (${r.year})`}
      </p>
      </div>
      
    }

  }
  ,

     {accessorKey:"status",
  
   header:()=> <p className="text-xs">Status</p>,
    
    cell:({row})=>{
    const statusStyle: Record<string, CSSProperties> = {
      OPERATIONAL: {backgroundColor:"#A6FA8F50", color:"#114403"},
      RESERVED: {backgroundColor:"#F8E46350", color:"#9C8807"},
       IN_MAINTENANCE:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
        OUT_OF_SERVICE:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
         
    }
  
      return <div className="flex items-center justify-center">
        <p style={statusStyle[row.original.status]||statusStyle.OPERATIONAL} className="px-4 py-2 2xl:text-sm text-xs rounded-lg font-extrabold">

        {row.original.status}
        </p>
         </div>
      
    }

  }
  ,
  {accessorKey:"type",
    header:()=> <p className="text-xs">Type</p>,
  
    
    cell:({row})=>{
    
   
  
      return <div className="flex flex-col">
        <p className="text-sm font-semibold">{row.original.type} </p>
        <p className="text-sm italic">{`Carburant : ${row.original.fuelType}`}</p>
      </div>
      
    }

  }
  ,
      {accessorKey:"capacity",
        header:()=> getHeader({sortBy:"maxPayloadKg",title:"Capacity"}),
   
    
    cell:({row})=>{
   
   
      return <div className="flex flex-col items-start px-4 py-px rounded-lg">
       <div className="flex items-center gap-2"> <p  className="text-sm">Charge max :</p><p className="font-semibold text-sm">{`${row.original.maxPayloadKg} Kg`} </p></div>
        
           <div className="flex items-center gap-2"> <p  className="text-sm">Poids Brut : </p><p className="font-semibold text-sm">{`${row.original.grossWeightKg} Kg`} </p></div>
         
          <div className="flex items-center gap-2"> <p  className="text-sm">Pallettes : </p><p className="font-semibold text-sm">{`${row.original.euroPalletCap} Pcs`} </p></div>
      </div>
      
    }

  },
       {accessorKey:"telematics",
         header:()=> <p className="hidden 2xl:flex">TELEMATICS</p>,
   
    
     cell:({row})=>{

      return <div className="hidden 2xl:flex flex-col items-start px-4 py-px rounded-lg">
       <div className="flex items-center gap-2"> <p  className="text-sm">Odometer :</p><p className="font-semibold text-sm">{`${row.original.currentOdometerKm} Km`} </p></div>
        
           <div className="flex items-center gap-2"> <p  className="text-sm">Id : </p><p className="font-semibold text-sm">{`${row.original.telematicsDeviceId}`} </p></div>
         
          <div className="flex items-center gap-2"> <p  className="text-sm">Consommation moy : </p><p className="font-semibold text-sm">{`${row.original.fuelConsumptionAvg} L/km`} </p></div>
      </div>
    
   
      
    }

  },
       {accessorKey:"chauffeur",
         header:()=> <p className="text-xs text-text-primary">Chauffeur</p>,
  
    
     cell:({row})=>{
    const driver=row.original.assignedDriver
      return <div className="flex flex-col items-start ">
        
        <p  className="text-sm font-bold">{driver?`${driver?.firstName} ${driver?.lastName}`:"Libre sans chauffeur"} </p>
       {driver&& <div className="flex items-center gap-2"> <p  className="text-sm font-semibold">Num :</p><p className=" text-sm">{driver.phone} </p></div>}
         {driver&& <div className="flex items-center gap-2"> <p  className="text-sm font-semibold">PC :</p><p className="text-sm">{driver.licenseNumber} </p></div>}
     
       
      </div>
      
    }

  },
 
       {accessorKey:"trailer",
         header:()=> <p className="text-xs text-text-primary">Remorque</p>,
  
    
     cell:({row})=>{
    const trailer=row.original.attachedTrailer
      return <div className="flex flex-col items-center ">
        <p  className="text-sm font-bold">{trailer?`${trailer?.make} ${trailer?.model}`:"sans remorque"} </p>
          {trailer&& <div className="flex items-center gap-2"> <p  className="text-sm font-semibold">Type :</p><p className="text-sm">{trailer.type} </p></div>}
     
        
    
      </div>
      
    }

  }, 
    
{
  header:()=> <p className="text-xs">Edit</p>,
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {

      return <SheetTrigger onClick={()=>setTruckToEdit(row.original)}  className="cursor-pointer" >
       <Pen className="text-primary bg-transparent hover:text-primary/50 hover:scale-150"/>
      </SheetTrigger>
              
    },
    
    }
  
  
]

const getHeader=({sortBy,title}:{sortBy:string,title:string})=>  {
  
         // eslint-disable-next-line react-hooks/rules-of-hooks
         const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
      return (
        <div
        className="text-xs flex gap-1 items-center cursor-pointer hover:bg-gray-cold/20 py-px px-2 rounded hover:font-bold"
          //onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onClick={()=>
          {
          params.set("order_by",sortBy)
          params.set("order_orientation",params.get("order_orientation")==="asc"?"desc":"asc")
          params.set("page","1")
          setSearchParams(params) 
          }
          }
        >
          
            <p className={` ${params.get("order_by")===sortBy?" font-extrabold underline text-sm":"text-xs"}`}>{title}</p>
           
          
          {params.get("order_by")!==sortBy?<ArrowUpDown className="ml-2 h-4 w-4" />:params.get("order_orientation")==="asc"?<ArrowDown className="ml-2 h-6 w-6" color="#1245ff" />:<ArrowUp className="ml-2 h-6 w-6" color="#1245ff"  />}
        </div>
      )
    }