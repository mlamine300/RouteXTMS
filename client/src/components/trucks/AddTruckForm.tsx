/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useEffect } from "react";
import { FUEL_TYPE,  VEHICLE_TYPE, VehicleForm } from "../../types";

import { Form } from "../ui/form";
import MyFormField from "../ui/MyFormField";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Button from "../ui/Button";
import { UseFormReturn } from "react-hook-form";
import { vehicleDefaultValues } from "../../types/zod";
import { BrushCleaning } from "lucide-react";
import { addTruckAction } from "../../actions/truckAction";


const AddTruckForm = ({form}:{form:UseFormReturn<VehicleForm>}) => {



  const onSubmit = async(data: VehicleForm) => {
   
  //form.reset(vehicleDefaultValues)
  await addTruckAction(data);
    //await addTruckAction(data)
  };

  


  return (
      <div className='h-full bg-background-base flex flex-col items-center'>
    <Form {...form}>
      
   
      <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6   w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center"
    >
   
        
       
      <div className="flex justify-between w-10/12 ">
      <p className="text-lg font-bold">Ajouter un Tracteur</p>
      <button onClick={()=>form.reset(vehicleDefaultValues)} className="flex gap-4 border-primary border rounded px-2 hover:font-bold active:bg-primary/50 group">
        Effacer
        <BrushCleaning className="group-hover:rotate-30 duration-300"/>
      </button>
    </div>
      

      <div className='grid grid-cols-2 gap-2 '>

      <MyFormField control={form.control} isRequired={true} key='fleetNumber' label='N° Tracteur'
 name='fleetNumber' onChange={(e:any)=>form.setValue("fleetNumber",e.target.value)}
  placeholder='012345 567 89' value={form.watch("fleetNumber")} />
  
   <MyFormField control={form.control} isRequired={true} key='plateNumber' label='Matricule'
 name='plateNumber' onChange={(e:any)=>form.setValue("plateNumber",e.target.value)}
  placeholder='X123 456' value={form.watch("plateNumber")} />

   <MyFormField control={form.control} isRequired={false} key='vin' label='N° châssis'
 name='vin' onChange={(e:any)=>form.setValue("vin",e.target.value)}
  placeholder='A1B2C3D4' value={form.watch("vin")} />
  
   <MyFormField control={form.control} isRequired={true} key='make' label='Constructeur'
 name='make' onChange={(e:any)=>form.setValue("make",e.target.value)}
  placeholder='Renault' value={form.watch("make")} />

     <MyFormField control={form.control} isRequired={true} key='model' label='Model'
 name='model' onChange={(e:any)=>form.setValue("model",e.target.value)}
  placeholder='T 480' value={form.watch("model")} />
  
   <MyFormField control={form.control} isRequired={true} type="number" key='year' label='Année'
 name='year' onChange={(e:any)=>form.setValue("year",Number(e.target.value))}
  placeholder='2025' value={form.watch("year")} />
 
      <MyFormField control={form.control} isRequired={true} key='type' label='Catégory'
 name='type' placeholder='' value={form.watch("type")}
  type="select" possibleValues={[...VEHICLE_TYPE]} onChange={(s:any)=>form.setValue("type",s)} />
  
   <MyFormField control={form.control} isRequired={true} key='fuelType' label='Carburant'
 name='fuelType' placeholder='Diesel' value={form.watch("fuelType")}
   type="select" possibleValues={[...FUEL_TYPE]} onChange={(s:any)=>form.setValue("fuelType",s)} />
 
 <Accordion type='multiple'  className="col-span-2" >
      <AccordionItem value="capacity">
        <AccordionTrigger>CAPACITY & DIMENSIONS</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={form.control} isRequired={true} key='maxPayloadKg' label='Charge Max'
 name='maxPayloadKg' onChange={(e:any)=>form.setValue("maxPayloadKg",Number(e.target.value))}
  placeholder='' value={form.watch("maxPayloadKg")} type="number" />
  
   <MyFormField control={form.control} isRequired={true} key='maxVolumeM3' label='Volume Max'
 name='maxVolumeM3' onChange={(e:any)=>form.setValue("maxVolumeM3",Number(e.target.value))}
  placeholder='' value={form.watch("maxVolumeM3")}  type="number" />

  <MyFormField control={form.control} isRequired={true} key='euroPalletCap' label='Nbr Pallettes'
 name='euroPalletCap' onChange={(e:any)=>form.setValue("euroPalletCap",Number(e.target.value))}
  placeholder='' value={form.watch("euroPalletCap")} type="number" />
  
   <MyFormField control={form.control} isRequired={true} key='grossWeightKg' label='Poids Brut'
 name='grossWeightKg' onChange={(e:any)=>form.setValue("grossWeightKg",Number(e.target.value))}
  placeholder='' value={form.watch("grossWeightKg")}  type="number" />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="specials">
        <AccordionTrigger>SPECIALIZED LOGISTICS FEATURES</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={form.control} isRequired={false} key='isRefrigerated' label='Refrigirateur'
 name='isRefrigerated' onChange={(e:any)=>form.setValue("isRefrigerated",e.target.value)}
  placeholder='' value={form.watch("isRefrigerated")}  />
  
   <MyFormField control={form.control} isRequired={false} key='tempMinCelsius' label='Min Températeur'
 name='tempMinCelsius' onChange={(e:any)=>form.setValue("tempMinCelsius",Number(e.target.value))}
  placeholder='' value={form.watch("tempMinCelsius")}  type="number" />

  <MyFormField control={form.control} isRequired={false} key='tempMaxCelsius' label='Max Températeur'
 name='tempMaxCelsius' onChange={(e:any)=>form.setValue("tempMaxCelsius",Number(e.target.value))}
  placeholder='' value={form.watch("tempMaxCelsius")} type="number" />
  
   <MyFormField control={form.control} isRequired={false} key='hasTailLift' label='Hayon'
 name='hasTailLift' onChange={(e:any)=>form.setValue("hasTailLift",e.target.value)}
  placeholder='' value={form.watch("hasTailLift")}   />

   <MyFormField control={form.control} isRequired={false} key='hasHazardousAdr' label='hasardeux'
 name='hasHazardousAdr' onChange={(e:any)=>form.setValue("hasHazardousAdr",e.target.value)}
  placeholder='' value={form.watch("hasHazardousAdr")}   />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="telematics">
        <AccordionTrigger>ODOMETER & TELEMATICS</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={form.control} isRequired={false} key='currentOdometerKm' label='KM Odometer'
 name='currentOdometerKm' onChange={(e:any)=>form.setValue("currentOdometerKm",Number(e.target.value))}
  placeholder='' value={form.watch("currentOdometerKm")} type="number" />
  
   <MyFormField control={form.control} isRequired={false} key='telematicsDeviceId' label='Appareil Id'
 name='telematicsDeviceId' onChange={(e:any)=>form.setValue("telematicsDeviceId",e.target.value)}
  placeholder='' value={form.watch("telematicsDeviceId")} />

  <MyFormField control={form.control} isRequired={false} key='fuelConsumptionAvg' label='Consomation moy'
 name='fuelConsumptionAvg' onChange={(e:any)=>form.setValue("fuelConsumptionAvg",Number(e.target.value))}
  placeholder='' value={form.watch("fuelConsumptionAvg")} type="number" />
  
   
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="regulatory">
        <AccordionTrigger>REGULATORY & MAINTENANCE COMPLIANCE</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={form.control} isRequired={false} key='insuranceNumber' label='N° Assurance'
 name='insuranceNumber' onChange={(e:any)=>form.setValue("insuranceNumber",e.target.value)}
  placeholder='' value={form.watch("insuranceNumber")}  />
  
   <MyFormField control={form.control} isRequired={false} key='insuranceExpiresAt' label='Assurance Expérer le'
 name='insuranceExpiresAt' onChange={(e:any)=>form.setValue("insuranceExpiresAt",e.target.value)}
  placeholder='' value={form.watch("insuranceExpiresAt")}  type="date" />

  <MyFormField control={form.control} isRequired={false} key='inspectionExpiresAt' label='Controle technique'
 name='inspectionExpiresAt' onChange={(e:any)=>form.setValue("inspectionExpiresAt",e.target.value)}
  placeholder='' value={form.watch("inspectionExpiresAt")} type="date" />
  
  
<MyFormField control={form.control} isRequired={false} key='tachographExpiresAt' label='Inspection tachygraphe'
 name='tachographExpiresAt' onChange={(e:any)=>form.setValue("tachographExpiresAt",e.target.value)}
  placeholder='' value={form.watch("tachographExpiresAt")} type="date" />
        </AccordionContent>
      </AccordionItem>
     
    </Accordion>

 <Button text='Sauvegarder' variant='primary' className='col-span-2' />
 </div>

  
    </form>
    </Form>
                
     
     
  </div>
  );
};


export default AddTruckForm
