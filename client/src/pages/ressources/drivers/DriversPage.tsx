
import {DataTable} from "../../../components/driver/data-table"
import {columns} from "../../../components/driver/columns"
import type { Driver } from "@/types";
import { Sheet } from "@/components/ui/sheet";
import FilterTableDiv from "@/components/driver/FilterTableDiv"
import EditDriverSheetContent from "@/components/driver/EditDriverSheetContent"
import { useEffect, useState } from "react";
import TablePagination from "@/components/driver/TablePagination"
import Button from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/Modal"
import {getDriversAction} from "@/actions/driverActions"
const DriversPage = () => {
    const [driverToEdit, setdriverToEdit] = useState<Driver|null>(null);
    const [showModal, setShowModal] = useState(false);
const [drivers, setDrivers] = useState<Driver[]>([]);
useEffect(()=>{
  const getDrivers=async()=>{
    const res=await getDriversAction({});
    console.log(res)
    if(res) setDrivers(res);
  }
  getDrivers();
},[])
  return (
    <main className=' page-layout bg-background-base'>
         <Sheet>

        
      <div className="w-full   min-h-40  py-4 flex flex-col items-center">
             <div className="flex justify-between  w-full">
                <h3 className="text-5xl mb-8">Gestion des chauffeurs</h3>
                <Button text="Ajouter un Chauffeur" variant="outline" className="h-16 px-6 py-1 flex items-center gap-2" icon={Plus} onClick={()=>setShowModal(true)} />
             </div>
        <section className=" w-full h-full p-2   rounded-lg shadow-2xl">
            <FilterTableDiv/>
        </section>
        
      </div>
      <section className="w-full h-full">
            <DataTable   columns={columns({setdriverToEdit})} data={drivers} />
            <TablePagination maxPages={10} className="flex justify-end gap-2 px-2 mt-4"/>
        </section>
        <EditDriverSheetContent driver={driverToEdit}/>
        <Modal title="Ajouter un Chauffeur" showModal={showModal} close={()=>setShowModal(false)}  >
           <p>hola</p>
        </Modal>
       </Sheet>
    </main>
  )
}

export default DriversPage
