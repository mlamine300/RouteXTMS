import FilterTableDiv from '@/components/trailers/FilterTableDiv'
import { columns } from '@/components/trailers/columns'
import Modal from '@/components/ui/Modal'
import SkeletonRow from '@/components/ui/SkeletonRow'
import TablePagination from '@/components/ui/TablePagination'
import Button from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Sheet } from '@/components/ui/sheet'
import type{ Parc, Trailer } from '@/types'
import { Plus } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import {searchTrailersAction} from "../../../actions/trailerAction"
import { getAllParcsAction } from '@/actions/parcActions'
const TRAILER_PER_PAGE=10;
const TrailersPage = () => {
const [parcs, setParcs] = useState<Parc[]>([]);

const [pending, setPending] = useState(false);
const [showModal, setShowModal] = useState(false);
const [trailerToEdit, setTrailerToEdit] = useState<Trailer|null>(null);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any

const [searchParams]=useSearchParams();
const status=searchParams.get("status")||"";
const parc=searchParams.get("parc_id")||"";
const type=searchParams.get("type")||"";
const page=Number(searchParams.get("page"))||1;
const skip=(page-1)*TRAILER_PER_PAGE;
const search=searchParams.get("search")||"";
const [trailers, setTrailers] = useState<Trailer[]>([]);

 useEffect(()=>{
   const getTrailers=async()=>{
    setPending(true)
   const res= await searchTrailersAction({status,type,search,limit:TRAILER_PER_PAGE,skip,assignedParcId:parc});
  setPending(false);
   if(res)setTrailers(res)
   }
   const getParks=async()=>{
    setPending(true);
    const res=await getAllParcsAction();
    if(res&&res.length>0)setParcs(res);
   }
  getTrailers();
  getParks();
 },[searchParams])


  return (
    <main className=' page-layout bg-background-base'>
         <Sheet>

        
      <div className="w-full   min-h-40   flex flex-col items-center">
             <div className="flex justify-between  w-full">
                <h3 className="text-3xl 2xl:text-5xl 2xl:mb-8">Gestion des Remorques</h3>
                <Button text="Ajouter un Tracteur" variant="outline" className="h-10 2xl:h-16 px-6 py-1 flex items-center gap-2" icon={Plus} onClick={()=>setShowModal(true)} />
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
                {columns({setTrailerToEdit}).map((col, idx) => (
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
        </div>:<DataTable   columns={columns({setTrailerToEdit})} data={trailers} />
}
            
            <TablePagination maxPages={10} className="flex justify-end gap-2 px-2 mt-4"/>
        </section>
        {(trailerToEdit&&trailerToEdit?.id)&&
        <p>hole</p>
        // <EditTrucksSheetContent truck={truckToEdit}/>
        }
        <Modal className="min-w-8/12 min-h-10/12 overflow-y-auto " title="Ajouter un Tracteur" showModal={showModal} close={()=>setShowModal(false)}  >
          {/* <AddTruckForm form={addTruckForm} /> */}
          <p>hola</p>
        </Modal>
       </Sheet>
    </main>
  )
}

export default TrailersPage
