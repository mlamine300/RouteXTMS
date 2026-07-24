import {

  LuLayoutDashboard,
  LuLogOut,

} from "react-icons/lu";
import {  BsTruckFlatbed   } from "react-icons/bs";


import {  Folders, Gem, SquareUser,   } from "lucide-react";
import { FaTools,  } from "react-icons/fa";
import { FaTrailer } from "react-icons/fa6";


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
      label: "Chauffeurs",
      icon: SquareUser,
      path: "/drivers",

    },
     {
      id:"22",
      label: "Tracteur ",
      icon: BsTruckFlatbed ,
      path: "/trucks",

    },
        {
      id:"23",
      label: "Tractable (remorque)",
      icon: FaTrailer,
      path: "/trailers",

    },
    {
      id:"24",
      label: "Equipments",
      icon: FaTools,
      path: "/equipments",

    },
    {
      id:"25",
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


    