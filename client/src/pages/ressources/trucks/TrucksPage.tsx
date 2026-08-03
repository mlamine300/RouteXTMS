
import {DataTable} from "../../../components/ui/data-table"
import {columns} from "../../../components/trucks/columns"

import { Sheet } from "../../../components/ui/sheet";
import FilterTableDiv from "../../../components/trucks/FilterTableDiv"

import TablePagination from "../../../components/ui/TablePagination"
import Button from "../../../components/ui/button";
import { Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal"

//import { useSearchParams } from "react-router";
import SkeletonRow from "../../../components/ui/SkeletonRow"
import { useEffect, useState } from "react";
import EditTrucksSheetContent from "../../../components/trucks/EditTrucksSheetContent"
import type { Vehicle } from "@/types";
import { searchTrucksAction} from "@/actions/truckAction"
import { useSearchParams } from "react-router";
const TRUCK_PER_PAGE=5;
const TrucksPage = () => {

const [pending, setPending] = useState(false);
const [showModal, setShowModal] = useState(false);
const [truckToEdit, setTruckToEdit] = useState<Vehicle|null>(null);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const [trucks, setTrucks] = useState<Vehicle[]>([]);
const [searchParams]=useSearchParams();
const status=searchParams.get("status")||"";
  const type=searchParams.get("type")||"";
  const fuel=searchParams.get("fuel")||"";
  const trailer=searchParams.get("trailer")||"";
  const page=Number(searchParams.get("page"))||1;
  const skip=(page-1)*TRUCK_PER_PAGE;
    const search=searchParams.get("search")||"";


 useEffect(()=>{
   const getTrucks=async()=>{
    setPending(true)
   const res= await searchTrucksAction({status,type,fuel,trailer,page,search,limit:TRUCK_PER_PAGE,skip});
  setPending(false);
   if(res)setTrucks(res)
   }
  getTrucks();
 },[searchParams])
  return (
    <main className=' page-layout bg-background-base'>
         <Sheet>

        
      <div className="w-full   min-h-40   flex flex-col items-center">
             <div className="flex justify-between  w-full">
                <h3 className="text-3xl 2xl:text-5xl 2xl:mb-8">Gestion des Tracteurs</h3>
                <Button text="Ajouter un Tracteur" variant="outline" className="h-10 2xl:h-16 px-6 py-1 flex items-center gap-2" icon={Plus} onClick={()=>setShowModal(true)} />
             </div>
        <section className=" w-full h-full p-2   rounded-lg shadow-2xl">
            <FilterTableDiv/>
        </section>
        
      </div>
      <section className="w-full h-full">
         {pending?  <div className="overflow-hidden rounded-md border flex items-center justify-center w-full border-gray-hot">
          <table className="bg-background-base border border-gray-hot w-full">
            <thead>
              <tr>
                {columns({setTruckToEdit}).map((col, idx) => (
                  <th key={idx} className="text-xs lg:text-sm px-4 py-2 bg-gray-hot/50 text-primary border border-gray-hot">
                    {/* Try to render header if possible */}
                    {typeof col.header === 'string' ? col.header : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonRow key={idx} columns={10} />
              ))}
            </tbody>
          </table>
        </div>:<DataTable   columns={columns({setTruckToEdit})} data={trucks} />
}
            
            <TablePagination maxPages={10} className="flex justify-end gap-2 px-2 mt-4"/>
        </section>
        {(truckToEdit&&truckToEdit?.id)&&<EditTrucksSheetContent truck={truckToEdit}/>}
        <Modal title="Ajouter un Tracteur" showModal={showModal} close={()=>setShowModal(false)}  >
           <p>hola</p>
        </Modal>
       </Sheet>
    </main>
  )
}

export default TrucksPage
