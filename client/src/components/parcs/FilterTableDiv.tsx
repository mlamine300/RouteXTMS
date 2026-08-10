/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';

import Input from '../ui/Input';
import { useLocation, useSearchParams } from 'react-router';


import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';

import { FaFileExcel } from 'react-icons/fa6';


 
//import { DropdownMenuRadio } from '../main/DropDownMenuRadio';

const FilterTableDiv = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // 1. Initialize state directly from URL parameters
  const [search, setSearch] = useState(searchParams.get("search") || "");
const [pending,setPending]=useState(false)
 

  // 2. Single effect to sync State -> URL Params (Debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      const updateParam = (key: string, value: string | boolean | undefined) => {
        if (value) params.set(key, String(value));
        else params.delete(key);
      };
    
      updateParam("search", search);
      
  

  
    

     
      params.delete("page");
      setSearchParams(params);
    }, 300);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
// Sync URL Params -> State (Handles browser Back/Forward or external URL changes)
  useEffect(() => {
    const pSearch = searchParams.get("search") || "";
    // The safe way: Only update state if the URL value is actually different!
    setSearch(prev => prev !== pSearch ? pSearch : prev);
  }, [pathname]);
  // Handle Reset cleanly
  const handleReset = () => {
   
    setSearch("");

  
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
           

            <div className='flex flex-col-reverse max-lg:self-center lg:flex-row lg:justify-between gap-4 lg:gap-8 lg:items-center px-8 mt-4'>
            <div className='flex gap-4'>

            
              <button
                onClick={handleDownloadExcel}
                disabled={pending}
                className="flex w-fit gap-4 items-center h-fit px-4 py-1 border text-primary border-gray-hot rounded-lg hover:font-semibold hover:border-primary bg-white shadow-2xl disabled:text-gray-cold transition-all"
                >
                Télécharger Fichier Parcs
                <FaFileExcel />
              </button>
                </div>

              {/* Changed <form> to <div> to avoid accidental submissions, or use onSubmit={(e)=>e.preventDefault()} */}
              <div className='flex flex-row items-center gap-4'>
                <Input parentClassName='flex flex-row items-center gap-2 w-fit lg:w-full' containerClassName='h-10' label='Recherche :'
                 labelClassName='text-xs hidden lg:flex' type='text' placeHolder='par nom..' value={search} onChange={(e) => setSearch(e.target.value)} />
                
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