/* eslint-disable @typescript-eslint/no-explicit-any */

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

import type{  Parc, parcFormType} from "../../types"
import { useEffect, useRef } from 'react';
 import {  useForm } from 'react-hook-form';
import { parcSchema } from '../../types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form} from "../ui/form";
import MyFormField from "../ui/MyFormField"
import Button from '../ui/button';
import { editParcAction } from '@/actions/parcActions';

const EditParcSheetContent = ({parc}:{parc:Parc|null}) => {

  const myForm = useForm<parcFormType>({
    resolver: zodResolver(parcSchema),

    defaultValues:{name:parc?.name||"",positionLat: parc?.positionLat || 0.00,positionLng: parc?.positionLng||0.00} ,
});

useEffect(() => {
  myForm.reset({name:parc?.name||"",positionLat: parc?.positionLat || 0.00,positionLng: parc?.positionLng||0.00});
}, [parc?.id]);


  const onSubmit = async(data: parcFormType) => {
   
    if(!parc||!parc.id)return;
    editParcAction(parc.id,data);
  };

  const ref=useRef<HTMLButtonElement|null>(null);
 

  return (
      <SheetContent className='h-full bg-background-base'>
    <SheetHeader>
      <SheetTitle className='flex items-center justify-center italic font-semibold'>{`Parc : ${parc?.name}`} </SheetTitle>
    </SheetHeader>
    

     
       {(parc&&parc.id)&& <Form {...myForm}>
      
    
      <form
      onSubmit={myForm.handleSubmit(onSubmit)}
      className="space-y-6   w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center overflow-y-auto"
    >
   
        
       
     
      

      <div className='grid grid-cols-2 gap-2 '>

      <MyFormField control={myForm.control} isRequired={true} key='name' label='Nom'
 name='name' onChange={(e:any)=>myForm.setValue("name",e.target.value)}
  placeholder='Entrepot Paris' value={myForm.watch("name")} />

      <MyFormField control={myForm.control} isRequired={true} key='positionLat' label='position Latitude'
 name='positionLat' placeholder='' value={myForm.watch("positionLat")}
  type="number" onChange={(e:any)=>myForm.setValue("positionLat",Number(e.target.value))} />

  <MyFormField control={myForm.control} isRequired={true} key='positionLng' label='position longitude'
 name='positionLng' placeholder='' value={Number(myForm.watch("positionLng"))}
  type="number" onChange={(e:any)=>myForm.setValue("positionLng",Number(e.target.value))} />
  
  
 

 <Button text='Sauvegarder' variant='primary' className='col-span-2' />
 </div>

  
    </form>
    </Form>}
                <SheetClose ref={ref}>
                    <p    className='border-red-500 text-red-500 hover:text-red-300 hover:border-red-400 w-full mt-auto border' >Ferme</p>
                  </SheetClose>
     
     
  </SheetContent>
  );
};



export default EditParcSheetContent;