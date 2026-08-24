/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import type { ColumnDef } from "@tanstack/react-table"
import type { CSSProperties } from "react"
import {   ArrowDown, ArrowUp, ArrowUpDown, Pen, Plug, Trash} from "lucide-react";
import type{Parc} from "../../types/index"
import { SheetTrigger } from "../ui/sheet";
import { Link, useSearchParams } from "react-router";
import { deleteParcAction } from "@/actions/parcActions";


const handleDelete = (parc:Parc) => {
    const confirmed = window.prompt('vous etes sur vous voullez supprimer ce parc\nsi oui ecrit "supprimer"');
    if (confirmed?.trim().toLowerCase() === 'supprimer'&&parc&&parc.id) {

     deleteParcAction(parc.id);
    }else{
      alert("suppression annulé")
    }

  };



export const columns:({setParcToEdit}:{setParcToEdit:any})=> ColumnDef<Parc>[] =({setParcToEdit})=> [
  {accessorKey:"Parc",
   header:()=> <p className="hidden 2xl:flex">Tracteur ID</p>,
    
    cell:({row})=>{
      const r=row.original;
 
      return <p className="font-semibold text-sm">
        {r.name}
      </p>
      
    }

  }
  ,
    {accessorKey:"position",
      
   header:()=> <p className="text-xs">Position</p>,
    
    cell:({row})=>{
      const r=row.original;
 
  
      return <Link to={`https://www.google.com/maps/place/@${r.positionLat},${r.positionLng},15z`} target="_blank"
       className="flex px-2 py-1 bg-teal-300/20 rounded items-center" >
       <p>(<strong>{r.positionLat}</strong> ; <strong>{r.positionLng}</strong>)</p>
      </Link>
  }}
  ,
  
  {accessorKey:"drivers",
    header:()=> <p className="text-xs">Chauffeurs</p>,
  
    
    cell:({row})=><p className="text-sm font-semibold">{row.original.drivers?.length||0} </p>

  }
  ,
    {accessorKey:"vehicles",
    header:()=> <p className="text-xs">Tracteurs</p>,
  
    
    cell:({row})=><p className="text-sm font-semibold">{row.original.vehicles?.length||0} </p>

  }
  ,
   {accessorKey:"trailers",
    header:()=> <p className="text-xs">Remorque</p>,
  
    
    cell:({row})=><p className="text-sm font-semibold">{row.original.trailers?.length||0} </p>

  }
  ,
    
{
  header:()=> <p className="text-xs">Edit</p>,
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      
      return <SheetTrigger onClick={()=>setParcToEdit(row.original)}  className="cursor-pointer" >
       <Pen className="text-primary bg-transparent hover:text-primary/50 hover:scale-150"/>
      </SheetTrigger>
              
    },
    
    }
  ,
    
{
  header:()=> <p className="text-xs">Delete</p>,
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      
      return <button onClick={()=>handleDelete(row.original)}  className="cursor-pointer" >
       <Trash color="#ff1256" className="bg-transparent hover:text-red-900/50 hover:scale-150"/>
      </button>
              
    },
    
    }
  
]
