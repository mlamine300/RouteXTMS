/* eslint-disable @typescript-eslint/no-explicit-any */

import {DataTable} from "../../../components/ui/data-table"
import {columns} from "../../../components/driver/columns"
import type { Driver, DriverForm, DriverStatus, LicenseCategory, Parc } from "../../../types";
import { Sheet } from "../../../components/ui/sheet";
import FilterTableDiv from "../../../components/driver/FilterTableDiv"
import EditDriverSheetContent from "../../../components/driver/EditDriverSheetContent"
import { useEffect, useMemo, useState } from "react";
import TablePagination from "../../../components/ui/TablePagination"
import Button from "../../../components/ui/Button";
import { Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal"
import {searchDriversAction} from "../../../actions/driverActions"
import { useSearchParams } from "react-router";
import SkeletonRow from "../../../components/ui/SkeletonRow"
import AddDriverForm from "../../../components/driver/AddDriverForm";
import { useForm } from "react-hook-form";
import { driverDefaultValues, driverSchema } from "../../../types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PlugTruckToDriver from "../../../components/driver/PlugTruckToDriver"
const DRIVER_PER_PAGE=10;
const DriversPage = () => {
    const [driverToEdit, setdriverToEdit] = useState<Driver|null>(null);
    const [modalType, setModalType] = useState<"add"|"plugin"|null>(null);
    const parcs:Parc[] = [
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

  const [searchParams]=useSearchParams();
   //const {setTriggerAppRender}=useUserContext()
  

   const [pending,setPending]=useState(false);
  //  const [sortFunction, setsortFunction] = useState<{sortBy:string,sort:-1|1}>({sortBy:"createdAt",sort:1});
  const orderBy=searchParams.get("order_by")||"createdAt";
  const orderOrientation=searchParams.get("order_orientation")==="desc"?"desc":"asc"
  const page=Number(searchParams.get("page"))||1;
    const search=searchParams.get("search")||"";
    const assignedParcId=searchParams.get("parc_id")||"";
  
    const status=searchParams.get("status") as DriverStatus;
    const licenseCategories = useMemo<LicenseCategory[]>(() => {
      const category = searchParams.get("licence_category");
      return category ? [category as LicenseCategory] : [];
    }, [searchParams]);
   
const skip=DRIVER_PER_PAGE*(page-1)

const addDriverForm=useForm<DriverForm>({
    resolver: zodResolver(driverSchema as any) ,

    defaultValues: driverDefaultValues,
    
});
const [drivers, setDrivers] = useState<Driver[]>([]);
useEffect(()=>{
  const getDrivers=async()=>{
    setPending(true)
    const res=await searchDriversAction({limit:DRIVER_PER_PAGE,skip,licenseCategories,orderBy,orderOrientation,status,search,assignedParcId});//,licenseCategory?:LicenseCategory,orderBy?:string,orderOrientation?:"asc"|"desc"
    console.log(res)
    if(res) setDrivers(res);
    setPending(false)
  }
  getDrivers();
},[skip,licenseCategories,orderBy,orderOrientation,status,search,assignedParcId])
  return (
    <main className=' page-layout bg-background-base'>
         <Sheet>

        
      <div className="w-full   min-h-40   flex flex-col items-center">
             <div className="flex justify-between  w-full">
                <h3 className="text-3xl 2xl:text-5xl 2xl:mb-8">Gestion des chauffeurs</h3>
                <Button text="Ajouter un Chauffeur" variant="outline" className="2xl:h-16 h-10 px-6 py-1 flex items-center gap-2" icon={Plus} onClick={()=>setModalType("add")} />
             </div>
        <section className=" w-full h-full p-2   rounded-lg shadow-2xl">
            <FilterTableDiv parcs={parcs}/>
        </section>
        
      </div>
      <section className="w-full h-full">
         {pending?  <div className="overflow-hidden rounded-md border flex items-center justify-center w-full border-gray-hot">
          <table className="bg-background-base border border-gray-hot w-full">
            <thead>
              <tr>
                {columns({setdriverToEdit,setModalType}).map((col, idx) => (
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
        </div>:<DataTable   columns={columns({setdriverToEdit,setModalType})} data={drivers} />
}
            
            <TablePagination maxPages={10} className="flex justify-end gap-2 px-2 mt-4"/>
        </section>
        {driverToEdit&&<EditDriverSheetContent driver={driverToEdit}/>}
        <Modal className="min-w-8/12 min-h-10/12 overflow-y-auto " title="Ajouter un Chauffeur" showModal={modalType!==null} close={()=>setModalType(null)}  >
          {modalType==="add"?<AddDriverForm form={addDriverForm} />: <PlugTruckToDriver driver={driverToEdit}/> }
        </Modal>
       </Sheet>
    </main>
  )
}

export default DriversPage
