import {

  LuLayoutDashboard,
  LuLogOut,

} from "react-icons/lu";
import {  BsTruckFlatbed   } from "react-icons/bs";


import {  Folders, Gem, SquareUser, Warehouse,   } from "lucide-react";
import { FaTools,  } from "react-icons/fa";
import { FaTrailer } from "react-icons/fa6";
import { Parc } from "../types";


export const SIDE_MENU_ADMIN_DATA = [
  {
    id: "01",
    label: "Tableau de bord",
    icon: LuLayoutDashboard,
    path: "/",
  },
   {
    id: "02",
    label: "Resources",
    icon: Gem,
    path: "/resources",
    hasChilds:true,
      childs:[
         {
      id:"21",
      label: "Parcs",
      icon: Warehouse,
      path: "/parcs",

    },
      {
      id:"22",
      label: "Chauffeurs",
      icon: SquareUser,
      path: "/drivers",

    },
     {
      id:"23",
      label: "Tracteur ",
      icon: BsTruckFlatbed ,
      path: "/trucks",

    },
        {
      id:"24",
      label: "Tractable (remorque)",
      icon: FaTrailer,
      path: "/trailers",

    },
    {
      id:"25",
      label: "Equipments",
      icon: FaTools,
      path: "/equipments",

    },
    {
      id:"26",
      label: "Documents liés aux ressources",
      icon: Folders,
      path: "/ressourcesdocuments",

    },
   
  ],
  },
 


  
     
  {
    id: "12",
    label: "Déconnecter",
    icon: LuLogOut,
    path: "/logout",
  },

];
export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Tableau de bord",
    icon: LuLayoutDashboard,
    path: "/",
    hasChilds:false

  },
    
  {
    id: "09",
    label: "Déconnecter",
    icon: LuLogOut,
    path: "/logout",
  },
];

export const  parcs:Parc[] = [
  {
    id:"39856ad4-224a-49ee-81a8-51b94bc20779",
    name: "Centre Logistique Paris-Rungis",
    positionLat: 48.7483,
    positionLng: 2.3486,
    drivers:[],
    vehicles:[],
    trailers:[]

  },
  {
    id:"808f7c10-49d4-4cc2-a330-f8bcdea9febe",
    name: "Hub Logistique Lyon-Saint-Quentin",
    positionLat: 45.6267,
    positionLng: 5.1147,
     drivers:[],
    vehicles:[],
    trailers:[]
  },
  {
    id:"d60c3a8b-a4cc-4651-8186-2d80e9cbfc39",
    name: "Plateforme Logistique Port de Fos",
    positionLat: 43.4378,
    positionLng: 4.9458,
     drivers:[],
    vehicles:[],
    trailers:[]
  },
];

    