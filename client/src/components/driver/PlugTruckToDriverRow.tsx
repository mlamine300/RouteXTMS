import{ useState, type CSSProperties } from "react";
import type{Driver, Vehicle} from "../../types"
import { Hammer, Plug } from "lucide-react";
import { forcePlugDriverToTruckAction, simplePlugDriverToTruckAction } from "@/actions/driverActions";

const PlugTruckToDriverRow = ({truck,driver}:{truck:Vehicle,driver:Driver}) => {
    
    const [pending, setPending] = useState(false);
  const simplePlug=truck.status==="OPERATIONAL" && truck.assignedParcId===driver.assignedParcId;

   const statusStyle: Record<string, CSSProperties> = {
      AVAILABLE: {backgroundColor:"#A6FA8F50", color:"#114403"},
      ON_TRIP: {backgroundColor:"#F8E46350", color:"#9C8807"},
       ON_BREAK:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
        OFF_DUTY:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"},
         INACTIVE:{backgroundColor:"#aa250050", color:"#660000", textDecoration:"line-through"}
    }

    const handleSimplePlug=async()=>{
        if(!truck.id)return;
        setPending(true);
        await simplePlugDriverToTruckAction(driver.id,truck.id)
        setPending(false);
    }

     const handleForcePlug=async()=>{
        if(!truck.id)return;
        setPending(true);
        await forcePlugDriverToTruckAction(driver.id,truck.id)
        setPending(false);
    }


    return (
    <div className={`grid grid-cols-6 items-center p-2 rounded-lg shadow-lg ${simplePlug?"":"bg-gray-500/80"}`}>
      <p className="text-sm font-semibold">{`Mat : ${truck.plateNumber}`} </p>
      <div className="flex flex-col">
      <p className="text-sm text-wrap">{`${truck.make} ${truck.model}`}</p>
     
      <p className="text-xs underline">{`Année : ${truck.year}`}</p>
      </div>
      <div className="flex flex-col">
      <p className="text-xs font-semibold text-nowrap">{`Catégory : ${truck.type}`} </p>
      <p className="text-xs italic">{`Energie : ${truck.fuelType}`} </p>
      </div>

     
  
    <div className="flex items-center justify-center">
        <p style={statusStyle[truck.status]||statusStyle.AVAILABLE} className="px-4 py-2 text-sm rounded-lg font-extrabold">

        {truck.status}
        </p>
         </div>

         <p className="text-sm font-semibold" >{truck.assignedParc?.name||"---"} </p>

         {simplePlug? <button disabled ={pending} onClick={()=>handleSimplePlug()} className="disabled:cursor-not-allowed  flex justify-center items-center p-px
          rounded-full bg-accent h-9 w-9 hover:scale-120 hover:rotate-12 mx-auto"> 
          <Plug color="green"/> </button>
          :
          <button onClick={()=>handleForcePlug()} disabled ={pending} className="disabled:cursor-not-allowed flex justify-center items-center p-px rounded-full bg-primary/50 h-9 w-9 hover:scale-120 hover:rotate-12 mx-auto"> <Hammer color="red"/> </button>}
    </div>
  )
}

export default PlugTruckToDriverRow
