import React, { useEffect, useState } from 'react'
import type{ Driver, Vehicle } from '../../types'
import Input from '../ui/Input'
import {searchTrucksAction} from "../../actions/truckAction"
import PlugTruckToDriverRow from "./PlugTruckToDriverRow"
import PlugTruckToDriverHeader from "./PlugTruckToDriverHeader"
const PlugTruckToDriver = ({driver}:{driver:Driver}) => {
   if(driver) console.log(driver.firstName)
    const [search, setSearch] = useState("");
  const [trucks, setTrucks] = useState<Vehicle[] >([]);
  useEffect(()=>{
    const searchTrucks=async()=>{
      const trucksRes=await searchTrucksAction({search})
      setTrucks(trucksRes);
    }

    searchTrucks();
  },[search])
  return (
    <div className='flex flex-col'>
    <div className='w-full flex flex-row justify-between'>
      
        <h3 className='w-full'>Attacher un tracteur</h3>
        
             <Input parentClassName='flex flex-row items-center gap-2 w-fit lg:w-full'
              containerClassName='h-10 ' label='Recherche :' labelClassName='text-xs hidden
               lg:flex text-nowrap' type='text' placeHolder='par matricul, vin model chauffeur..' 
               value={search} onChange={(e) => setSearch(e.target.value)} />  
    </div>
    <div className='flex flex-col w-full overflow-y-auto gap-2 pt-8'>
      <PlugTruckToDriverHeader />
      {trucks.map(t=> <PlugTruckToDriverRow truck={t} driver={driver} /> )}
    </div>
    </div>
  )
}

export default PlugTruckToDriver
