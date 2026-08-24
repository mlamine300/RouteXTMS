import { useEffect, useState } from 'react'
import { Sheet } from '../../../components/ui/sheet'
import Button from '../../../components/ui/button'
import FilterTableDiv from '../../../components/parcs/FilterTableDiv'
import { columns } from '../../../components/parcs/columns'
import SkeletonRow from '../../../components/ui/SkeletonRow'
import { DataTable } from '../../../components/ui/data-table'
import TablePagination from '../../../components/ui/TablePagination'
import Modal from '../../../components/ui/Modal'
import EditParcSheetContent from '../../../components/parcs/EditParcSheetContent'
import type { Parc } from '../../../types'
import { useSearchParams } from 'react-router'
import { searchParcsAction } from '../../../actions/parcActions'
import { Plus } from 'lucide-react'
import AddParcForm from "../../../components/parcs/AddParcForm"
const ParcsPage = () => {
    const [searchParams]=useSearchParams();
    const search=searchParams.get("search")||"";
    const page=searchParams.get("page")?Number(searchParams.get("page")):1;
    const [parcToEdit, setParcToEdit] = useState<Parc|null>(null);
    const [pending, setPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [parcs, setParcs] = useState<Parc[]>([]);
    
    useEffect(()=>{
        const fetchParcs=async()=>{
            setPending(true);
            const res=await searchParcsAction({search,page})
            if(res)setParcs(res)
                setPending(false);
        }
    fetchParcs();
    },[search])
  return (
      <main className=' page-layout bg-background-base'>
         <Sheet>

        
      <div className="w-full   min-h-40   flex flex-col items-center">
             <div className="flex justify-between  w-full">
                <h3 className="text-3xl 2xl:text-5xl 2xl:mb-8">Gestion des Parcs</h3>
                <Button text="Ajouter un Parc" variant="outline" className="h-10 2xl:h-16 px-6 py-1 flex items-center gap-2" 
                icon={Plus} onClick={()=>setShowModal(true)} />
             </div>
        <section className=" w-full h-full p-2   rounded-lg shadow-2xl">
            <FilterTableDiv />
        </section>
        
      </div>
      <section className="w-full h-full">
         {pending?  <div className="overflow-hidden rounded-md border flex items-center justify-center w-full border-gray-hot">
          <table className="bg-background-base border border-gray-hot w-full">
            <thead>
              <tr>
                {columns({setParcToEdit}).map((col, idx) => (
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
        </div>:<DataTable data={parcs}  columns={columns({setParcToEdit})} />
}
            
            <TablePagination maxPages={10} className="flex justify-end gap-2 px-2 mt-4"/>
        </section>
        {(parcToEdit&&parcToEdit?.id)&&<EditParcSheetContent parc={parcToEdit} />}
        <Modal  title="Ajouter un Parc" showModal={showModal} close={()=>setShowModal(false)}  >
          <AddParcForm/>
        </Modal>
       </Sheet>
    </main>
  )
}

export default ParcsPage
