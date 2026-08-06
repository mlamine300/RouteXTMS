/* eslint-disable react-hooks/set-state-in-effect */
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

import Input from '../ui/Input';
import { useLocation, useSearchParams } from 'react-router';


import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';

import { FaFileExcel } from 'react-icons/fa6';
import { DRIVER_STATUS, LICENSE_CATEGORY, type DriverStatus, type LicenseCategory } from '../../types';
import { Parc } from '../../types';
import MySelect from '../ui/MySelect';

 
//import { DropdownMenuRadio } from '../main/DropDownMenuRadio';

const FilterTableDiv = ({ className,parcs }: { className?: string,parcs:Parc[] }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // 1. Initialize state directly from URL parameters
  const [search, setSearch] = useState(searchParams.get("search") || "");
const [pending,setPending]=useState(false)
  const [status,setStatus]=useState<DriverStatus|"">("AVAILABLE")
  const [LicenseCategory, setLicenseCategory] = useState<LicenseCategory|"">("C");
const [city, setCity] = useState("");
const [distanceFromCity, setdistanceFromCity] = useState(-1);
const [assignedParcId, setAssignedParcId] = useState<string>(searchParams.get("parc_id") || "");
  
  const assignedParc=(assignedParcId&&assignedParcId.length>0)? parcs.filter(p=>p.id===assignedParcId).at(0):null;
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      const updateParam = (key: string, value: string | boolean | undefined) => {
        if (value) params.set(key, String(value));
        else params.delete(key);
      };
     
      updateParam("parc_id", assignedParcId);
       updateParam("search", search);
      updateParam("status",status);
       updateParam("licence_category",LicenseCategory);
        updateParam("city",city);
         updateParam("distance_from_city",distanceFromCity+"");
    

     
      params.delete("page");
      setSearchParams(params);
    }, 300);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search,status,LicenseCategory,city,distanceFromCity,assignedParcId]);
// Sync URL Params -> State (Handles browser Back/Forward or external URL changes)
  useEffect(() => {
   
    const pSearch = searchParams.get("search") || "";
    const pAssignedParcId=searchParams.get("parc_id")||""
     const pStatus :DriverStatus = searchParams.get("status") as DriverStatus || "" ;
      const pLicenceCategory : LicenseCategory = searchParams.get("licence_category") as LicenseCategory || "";
       const pCity = searchParams.get("city") || "";
        const pDistanceFromCity = Number(searchParams.get("distanceFromCity")) || -1;
    
    

  
   

  

    // The safe way: Only update state if the URL value is actually different!
    setSearch(prev => prev !== pSearch ? pSearch : prev);
    setAssignedParcId(prev => prev !== pAssignedParcId ? pAssignedParcId : prev);
    setStatus((prev:string) => prev !== pStatus ? pStatus : prev);
    setLicenseCategory((prev:string) => prev !== pLicenceCategory ? pLicenceCategory : prev);
    setCity(prev => prev !== pCity ? pCity : prev);
    setdistanceFromCity(prev => prev !== pDistanceFromCity ? pDistanceFromCity : prev);
      
    
   


  }, [pathname]);
  // Handle Reset cleanly
  const handleReset = () => {
    setAssignedParcId("");
    setSearch("");
    setStatus("");
    setLicenseCategory("");
    setCity("");
    setdistanceFromCity(-1)
  
  };

  const handleDownloadExcel = async () => {
    try {
      setPending(true);
      //await donwloadExcel(pathname);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className='py-0'>
          <h3 className='font-black text-text-primary text-lg italic underline hover:text-xl'>
            Filtres et recherche
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className='flex flex-col gap-0 justify-around my-2'>
            <div className={cn("flex flex-col gap-1 md:grid md:grid-cols-3 lg:grid-cols-4 w-full md:min-h-24 md:gap-2", className)}>
              
             <div className="flex flex-col items-start gap-0">
                <label className='w-full flex text-xs italic'>Parc</label>
              <MySelect label='Parc' name='assignedParcId' possibleValues={parcs.map(p=>p.name||"")} value={assignedParc?.name??""} onChange={(s:string)=>setAssignedParcId(parcs.filter(p=>p.name===s).at(0)?.id||"")} />
               </div>
               <div className="flex flex-col items-start gap-0">
                <label className='w-full flex text-xs italic'>Status</label>
              <MySelect label='Status' name='' onChange={(v:string)=>setStatus((v as DriverStatus)||"")} possibleValues={[...DRIVER_STATUS]} value={status} />
             </div>
             
             <div className="flex flex-col items-start gap-0">
                <label className='w-full flex text-xs italic'>Catégory de Permit</label>
              <MySelect label='Catégory' name='' onChange={(value:string)=>setLicenseCategory((value as LicenseCategory)||"")} possibleValues={[...LICENSE_CATEGORY]} value={LicenseCategory} />
             </div>

              

            
                 <Input parentClassName='flex flex-col items-start gap-0 '
                  containerClassName='h-10' label='Ville :' 
                  labelClassName='w-full flex text-xs italic'
                   type='text' placeHolder='Selectionner une ville'
                    value={city} onChange={(e) => setCity(e.target.value)} />

                   <Input parentClassName='flex flex-col items-start gap-0'
                  containerClassName='h-10' label='Distance KM :' 
                  labelClassName='w-full flex text-xs italic'
                   type='number' placeHolder='Distance entre la ville et le chauffeur'
                    value={distanceFromCity+""} onChange={(e) => setdistanceFromCity(Number(e.target.value)||0)} />
            

             
            </div>

            <div className='flex flex-col-reverse max-lg:self-center lg:flex-row lg:justify-between gap-4 lg:gap-8 lg:items-center px-8 mt-4'>
            <div className='flex gap-4'>

            
              <button
                onClick={handleDownloadExcel}
                disabled={pending}
                className="flex w-fit gap-4 items-center h-fit px-4 py-1 border text-primary border-gray-hot rounded-lg hover:font-semibold hover:border-primary bg-white shadow-2xl disabled:text-gray-cold transition-all"
                >
                Télécharger Fichier Chauffeurs
                <FaFileExcel />
              </button>
                </div>

              {/* Changed <form> to <div> to avoid accidental submissions, or use onSubmit={(e)=>e.preventDefault()} */}
              <div className='flex flex-row items-center gap-4'>
                <Input parentClassName='flex flex-row items-center gap-2 w-fit lg:w-full' containerClassName='h-10' label='Recherche :' labelClassName='text-xs hidden lg:flex' type='text' placeHolder='rechercher par Nom, Telephone, permis ou matricule' value={search} onChange={(e) => setSearch(e.target.value)} />
                
                {/* Critical: type="button" added */}
                <button type="button" className='hover:font-bold italic underline whitespace-nowrap' onClick={handleReset}>
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterTableDiv;