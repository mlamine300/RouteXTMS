
import {DataTable} from "../../../components/driver/data-table"
import {columns} from "../../../components/driver/columns"
import type { Driver, DriverStatus, LicenseCategory } from "@/types";
import { Sheet } from "@/components/ui/sheet";
import FilterTableDiv from "@/components/driver/FilterTableDiv"
import EditDriverSheetContent from "@/components/driver/EditDriverSheetContent"
import { useEffect, useMemo, useState } from "react";
import TablePagination from "@/components/driver/TablePagination"
import Button from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/Modal"
import {searchDriversAction} from "@/actions/driverActions"
import { useSearchParams } from "react-router";
import SkeletonRow from "@/components/driver/SkeletonRow"
const DRIVER_PER_PAGE=10;
const DriversPage = () => {
    const [driverToEdit, setdriverToEdit] = useState<Driver|null>(null);
    const [showModal, setShowModal] = useState(false);

  const [searchParams]=useSearchParams();
   //const {setTriggerAppRender}=useUserContext()
 

   const [pending,setPending]=useState(false);
  //  const [sortFunction, setsortFunction] = useState<{sortBy:string,sort:-1|1}>({sortBy:"createdAt",sort:1});
  const orderBy=searchParams.get("order_by")||"createdAt";
  const orderOrientation=searchParams.get("order_orientation")==="desc"?"desc":"asc"
  const page=Number(searchParams.get("page"))||1;
    const search=searchParams.get("search")||"";
  
    const status=searchParams.get("status") as DriverStatus;
    const licenseCategories = useMemo<LicenseCategory[]>(() => {
      const category = searchParams.get("licence_category");
      return category ? [category as LicenseCategory] : [];
    }, [searchParams]);
    console.log(licenseCategories)
const skip=DRIVER_PER_PAGE*(page-1)


const [drivers, setDrivers] = useState<Driver[]>([]);
useEffect(()=>{
  const getDrivers=async()=>{
    setPending(true)
    const res=await searchDriversAction({limit:DRIVER_PER_PAGE,skip,licenseCategories,orderBy,orderOrientation,status,search});//,licenseCategory?:LicenseCategory,orderBy?:string,orderOrientation?:"asc"|"desc"
    console.log(res)
    if(res) setDrivers(res);
    setPending(false)
  }
  getDrivers();
},[skip,licenseCategories,orderBy,orderOrientation,status,search])
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
         {pending?  <div className="overflow-hidden rounded-md border flex items-center justify-center w-full border-gray-hot">
          <table className="bg-background-base border border-gray-hot w-full">
            <thead>
              <tr>
                {columns({setdriverToEdit}).map((col, idx) => (
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
        </div>:<DataTable   columns={columns({setdriverToEdit})} data={drivers} />
}
            
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
