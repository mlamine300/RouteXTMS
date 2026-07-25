/* eslint-disable react-hooks/set-state-in-effect */
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

import Input from '../ui/Input';
import { useLocation, useSearchParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';

import { FaFileExcel } from 'react-icons/fa6';
import { DRIVER_STATUS, LICENSE_CATEGORY, type DriverStatus, type LicenseCategory } from '@/types';

 
//import { DropdownMenuRadio } from '../main/DropDownMenuRadio';

const FilterTableDiv = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // 1. Initialize state directly from URL parameters
  const [search, setSearch] = useState(searchParams.get("search") || "");
const [pending,setPending]=useState(false)
  const [status,setStatus]=useState<DriverStatus|"">("AVAILABLE")
  const [LicenseCategory, setLicenseCategory] = useState<LicenseCategory|"">("C");
const [city, setCity] = useState("");
const [distanceFromCity, setdistanceFromCity] = useState(-1);

  // 2. Single effect to sync State -> URL Params (Debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      const updateParam = (key: string, value: string | boolean | undefined) => {
        if (value) params.set(key, String(value));
        else params.delete(key);
      };
     
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
  }, [search,status,LicenseCategory,city,distanceFromCity]);
// Sync URL Params -> State (Handles browser Back/Forward or external URL changes)
  useEffect(() => {
   
    const pSearch = searchParams.get("search") || "";
     const pStatus :DriverStatus = searchParams.get("status") as DriverStatus || "" ;
      const pLicenceCategory : LicenseCategory = searchParams.get("licence_category") as LicenseCategory || "";
       const pCity = searchParams.get("city") || "";
        const pDistanceFromCity = Number(searchParams.get("distanceFromCity")) || -1;
    
    

  
   

  

    // The safe way: Only update state if the URL value is actually different!
    setSearch(prev => prev !== pSearch ? pSearch : prev);
    setStatus(prev => prev !== pStatus ? pStatus : prev);
    setLicenseCategory(prev => prev !== pLicenceCategory ? pLicenceCategory : prev);
    setCity(prev => prev !== pCity ? pCity : prev);
    setdistanceFromCity(prev => prev !== pDistanceFromCity ? pDistanceFromCity : prev);
      
    
   


  }, [pathname]);
  // Handle Reset cleanly
  const handleReset = () => {
   
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
                <label className='w-full flex text-xs italic'>Status</label>
                <Select value={status} onValueChange={(v:string)=>setStatus((v as DriverStatus)||"")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-base">
                    <p className='text-sm hover:cursor-pointer p-2' onClick={() => setStatus("")}>
                      Status
                    </p>
                    {DRIVER_STATUS?.map((val) => (
                      <SelectItem className="cursor-pointer hover:bg-gray-hot" key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-start gap-0">
                <label className='w-full flex text-xs italic'>Catégory de Permit</label>
                <Select value={LicenseCategory} onValueChange={(value)=>setLicenseCategory((value as LicenseCategory)||"")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-base">
                    <p className='text-sm hover:cursor-pointer p-2' onClick={() => setLicenseCategory("")}>
                      Catégory
                    </p>
                    {LICENSE_CATEGORY?.map((val) => (
                      <SelectItem className="cursor-pointer hover:bg-gray-hot" key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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