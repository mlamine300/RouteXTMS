/* eslint-disable @typescript-eslint/no-explicit-any */
import type{  parcFormType} from "../../types"

 import {  useForm } from 'react-hook-form';
import { parcSchema } from '../../types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form} from "../ui/form";
import MyFormField from "../ui/MyFormField"
import Button from '../ui/Button';
import toast from 'react-hot-toast'
import {addParcAction} from "../../actions/parcActions"
const AddParcForm = () => {
const form = useForm<parcFormType>({
    resolver: zodResolver(parcSchema),
    defaultValues:{name:"",positionLat:  0.00,positionLng:0.00} ,
});

const onSubmit=async(data: parcFormType)=>{
    const missingKeys=["name","positionLat","positionLng"].filter(x=>!Object.keys(data).includes(x));
    if(missingKeys&&missingKeys.length){
    toast.error("Infomation incomplete merci de saisir "+missingKeys.join(","))
    }

    const parc =await addParcAction(data);
    console.log(parc)
}
  return (

    <Form {...form}>
       <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6   w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center overflow-y-auto"
    >
   
        
       
     
      

      <div className='grid grid-cols-2 gap-2 '>

      <MyFormField control={form.control} isRequired={true} key='name' label='Nom'
 name='name' onChange={(e:any)=>form.setValue("name",e.target.value)}
  placeholder='Entrepot Paris' value={form.watch("name")} />

      <MyFormField control={form.control} isRequired={true} key='positionLat' label='position Latitude'
 name='positionLat' placeholder='' value={form.watch("positionLat")}
  type="number" onChange={(e:any)=>form.setValue("positionLat",Number(e.target.value))} />

  <MyFormField control={form.control} isRequired={true} key='positionLng' label='position longitude'
 name='positionLng' placeholder='' value={Number(form.watch("positionLng"))}
  type="number" onChange={(e:any)=>form.setValue("positionLng",Number(e.target.value))} />
  
  
 

 <Button text='Sauvegarder' variant='primary' className='col-span-2' />
 </div>

  
    </form>
    </Form>
  )
}

export default AddParcForm
