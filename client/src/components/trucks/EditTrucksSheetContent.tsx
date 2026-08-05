/* eslint-disable @typescript-eslint/no-explicit-any */

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

import{ FUEL_TYPE, VEHICLE_TECHNICAL_STATUS, VEHICLE_TYPE, type Vehicle, type VehicleForm} from "../../types"
import { useEffect, useRef } from 'react';
 import {  useForm } from 'react-hook-form';
import { vehicleSchema } from '../../types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form} from "../ui/form";
import MyFormField from "../../components/ui/MyFormField"
import Button from '../ui/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { editTruckAction } from '../../actions/truckAction';
const EditTrucksSheetContent = ({truck}:{truck:Vehicle|null}) => {

  const myForm = useForm<VehicleForm>({
    resolver: zodResolver(vehicleSchema),

    defaultValues: {
        fleetNumber:truck?.fleetNumber || "",
        plateNumber: truck?.plateNumber|| "",
        vin: truck?.vin||"",

        make: truck?.make||"",
        model: truck?.model||"",
        year: truck?.year||new Date().getFullYear(),

        type: truck?.type||VEHICLE_TYPE[0],
        fuelType:truck?.fuelType ||FUEL_TYPE[0],
        status: truck?.status ||VEHICLE_TECHNICAL_STATUS[0],

        maxPayloadKg: truck?.maxPayloadKg||0,
        maxVolumeM3: truck?.maxVolumeM3 ||0,

        euroPalletCap: truck?.euroPalletCap,
        grossWeightKg: truck?.grossWeightKg,
        curbWeightKg: truck?.curbWeightKg,

        isRefrigerated: truck?.isRefrigerated||false,
        tempMinCelsius: truck?.tempMinCelsius,
        tempMaxCelsius: truck?.tempMaxCelsius,

        hasTailLift: truck?.hasTailLift||false,
        hasHazardousAdr: truck?.hasHazardousAdr||false,

        insuranceNumber: truck?.insuranceNumber||"",
        insuranceExpiresAt: truck?.insuranceExpiresAt,

        inspectionExpiresAt: truck?.inspectionExpiresAt,
        tachographExpiresAt: truck?.tachographExpiresAt,

        currentOdometerKm: truck?.currentOdometerKm||0,

        telematicsDeviceId: truck?.telematicsDeviceId||"",
        fuelConsumptionAvg: truck?.fuelConsumptionAvg,

        isActive: truck?.isActive!==null?truck?.isActive:true,
    },
});

useEffect(() => {
  myForm.reset({
    fleetNumber: truck?.fleetNumber || "",
    plateNumber: truck?.plateNumber || "",
    vin: truck?.vin || "",

    make: truck?.make || "",
    model: truck?.model || "",
    year: truck?.year || new Date().getFullYear(),

    type: truck?.type || VEHICLE_TYPE[0],
    fuelType: truck?.fuelType || FUEL_TYPE[0],
    status: truck?.status || VEHICLE_TECHNICAL_STATUS[0],

    maxPayloadKg: truck?.maxPayloadKg || 0,
    maxVolumeM3: truck?.maxVolumeM3 || 0,

    euroPalletCap: truck?.euroPalletCap,
    grossWeightKg: truck?.grossWeightKg,
    curbWeightKg: truck?.curbWeightKg,

    isRefrigerated: truck?.isRefrigerated || false,
    tempMinCelsius: truck?.tempMinCelsius,
    tempMaxCelsius: truck?.tempMaxCelsius,

    hasTailLift: truck?.hasTailLift || false,
    hasHazardousAdr: truck?.hasHazardousAdr || false,

    insuranceNumber: truck?.insuranceNumber || "",
    insuranceExpiresAt: truck?.insuranceExpiresAt,

    inspectionExpiresAt: truck?.inspectionExpiresAt,
    tachographExpiresAt: truck?.tachographExpiresAt,

    currentOdometerKm: truck?.currentOdometerKm || 0,

    telematicsDeviceId: truck?.telematicsDeviceId || "",
    fuelConsumptionAvg: truck?.fuelConsumptionAvg,

    isActive: truck?.isActive !== null ? truck?.isActive : true,
  });
}, [truck?.id]);
  const onSubmit = async(data: VehicleForm) => {
   
    if(!truck||!truck.id)return;
    await editTruckAction(truck?.id,data)
  };

  const ref=useRef<HTMLButtonElement|null>(null);
  console.log(truck)
  if(!truck)return "";

  return (
      <SheetContent className='h-full bg-background-base'>
    <SheetHeader>
      <SheetTitle className='flex items-center justify-center italic font-semibold'>{`Véhicle : ${truck?.plateNumber}`} </SheetTitle>
    </SheetHeader>
    

     
       {(truck&&truck.id)&& <Form {...myForm}>
      
    
      <form
      onSubmit={myForm.handleSubmit(onSubmit)}
      className="space-y-6   w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center overflow-y-auto"
    >
   
        
       
     
      

      <div className='grid grid-cols-2 gap-2 '>

      <MyFormField control={myForm.control} isRequired={true} key='fleetNumber' label='N° Tracteur'
 name='fleetNumber' onChange={(e:any)=>myForm.setValue("fleetNumber",e.target.value)}
  placeholder='012345 567 89' value={myForm.watch("fleetNumber")} />
  
   <MyFormField control={myForm.control} isRequired={true} key='plateNumber' label='Matricule'
 name='plateNumber' onChange={(e:any)=>myForm.setValue("plateNumber",e.target.value)}
  placeholder='X123 456' value={myForm.watch("plateNumber")} />

   <MyFormField control={myForm.control} isRequired={false} key='vin' label='N° châssis'
 name='vin' onChange={(e:any)=>myForm.setValue("vin",e.target.value)}
  placeholder='A1B2C3D4' value={myForm.watch("vin")} />
  
   <MyFormField control={myForm.control} isRequired={true} key='make' label='Constructeur'
 name='make' onChange={(e:any)=>myForm.setValue("make",e.target.value)}
  placeholder='Renault' value={myForm.watch("make")} />

     <MyFormField control={myForm.control} isRequired={true} key='model' label='Model'
 name='model' onChange={(e:any)=>myForm.setValue("model",e.target.value)}
  placeholder='T 480' value={myForm.watch("model")} />
  
   <MyFormField control={myForm.control} type='number' isRequired={true} key='year' label='Année'
 name='year' onChange={(e:any)=>myForm.setValue("year",Number(e.target.value))}
  placeholder='2025' value={myForm.watch("year")} />
 
      <MyFormField control={myForm.control} isRequired={true} key='type' label='Catégory'
 name='type' placeholder='' value={myForm.watch("type")}
  type="select" possibleValues={[...VEHICLE_TYPE]} onChange={(s:any)=>myForm.setValue("type",s)} />
  
   <MyFormField control={myForm.control} isRequired={true} key='fuelType' label='Carburant'
 name='fuelType' placeholder='Diesel' value={myForm.watch("fuelType")}
   type="select" possibleValues={[...FUEL_TYPE]} onChange={(s:any)=>myForm.setValue("fuelType",s)} />
 
 <Accordion type='multiple'  className="col-span-2" >
      <AccordionItem value="capacity">
        <AccordionTrigger>CAPACITY & DIMENSIONS</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={myForm.control} isRequired={true} key='maxPayloadKg' label='Charge Max'
 name='maxPayloadKg' onChange={(e:any)=>myForm.setValue("maxPayloadKg",Number(e.target.value))}
  placeholder='' value={myForm.watch("maxPayloadKg")} type="number" />
  
   <MyFormField control={myForm.control} isRequired={true} key='maxVolumeM3' label='Volume Max'
 name='maxVolumeM3' onChange={(e:any)=>myForm.setValue("maxVolumeM3",Number(e.target.value))}
  placeholder='' value={myForm.watch("maxVolumeM3")}  type="number" />

  <MyFormField control={myForm.control} isRequired={true} key='euroPalletCap' label='Nbr Pallettes'
 name='euroPalletCap' onChange={(e:any)=>myForm.setValue("euroPalletCap",Number(e.target.value))}
  placeholder='' value={myForm.watch("euroPalletCap")} type="number" />
  
   <MyFormField control={myForm.control} isRequired={true} key='grossWeightKg' label='Poids Brut'
 name='grossWeightKg' onChange={(e:any)=>myForm.setValue("grossWeightKg",Number(e.target.value))}
  placeholder='' value={myForm.watch("grossWeightKg")}  type="number" />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="specials">
        <AccordionTrigger>SPECIALIZED LOGISTICS FEATURES</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={myForm.control} isRequired={false} key='isRefrigerated' label='Refrigirateur'
 name='isRefrigerated' onChange={(e:any)=>myForm.setValue("isRefrigerated",e.target.value)}
  placeholder='' value={myForm.watch("isRefrigerated")}  />
  
   <MyFormField control={myForm.control} isRequired={false} key='tempMinCelsius' label='Min Températeur'
 name='tempMinCelsius' onChange={(e:any)=>myForm.setValue("tempMinCelsius",Number(e.target.value))}
  placeholder='' value={myForm.watch("tempMinCelsius")}  type="number" />

  <MyFormField control={myForm.control} isRequired={false} key='tempMaxCelsius' label='Max Températeur'
 name='tempMaxCelsius' onChange={(e:any)=>myForm.setValue("tempMaxCelsius",Number(e.target.value))}
  placeholder='' value={myForm.watch("tempMaxCelsius")} type="number" />
  
   <MyFormField control={myForm.control} isRequired={false} key='hasTailLift' label='Hayon'
 name='hasTailLift' onChange={(e:any)=>myForm.setValue("hasTailLift",e.target.value)}
  placeholder='' value={myForm.watch("hasTailLift")}   />

   <MyFormField control={myForm.control} isRequired={false} key='hasHazardousAdr' label='hasardeux'
 name='hasHazardousAdr' onChange={(e:any)=>myForm.setValue("hasHazardousAdr",e.target.value)}
  placeholder='' value={myForm.watch("hasHazardousAdr")}   />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="telematics">
        <AccordionTrigger>ODOMETER & TELEMATICS</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={myForm.control} isRequired={false} key='currentOdometerKm' label='KM Odometer'
 name='currentOdometerKm' onChange={(e:any)=>myForm.setValue("currentOdometerKm",Number(e.target.value))}
  placeholder='' value={myForm.watch("currentOdometerKm")} type="number" />
  
   <MyFormField control={myForm.control} isRequired={false} key='telematicsDeviceId' label='Appareil Id'
 name='telematicsDeviceId' onChange={(e:any)=>myForm.setValue("telematicsDeviceId",e.target.value)}
  placeholder='' value={myForm.watch("telematicsDeviceId")} />

  <MyFormField control={myForm.control} isRequired={false} key='fuelConsumptionAvg' label='Consomation moy'
 name='fuelConsumptionAvg' onChange={(e:any)=>myForm.setValue("fuelConsumptionAvg",Number(e.target.value))}
  placeholder='' value={myForm.watch("fuelConsumptionAvg")} type="number" />
  
   
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="regulatory">
        <AccordionTrigger>REGULATORY & MAINTENANCE COMPLIANCE</AccordionTrigger>
        <AccordionContent className='grid grid-cols-2 gap-2'>
          <MyFormField control={myForm.control} isRequired={false} key='insuranceNumber' label='N° Assurance'
 name='insuranceNumber' onChange={(e:any)=>myForm.setValue("insuranceNumber",e.target.value)}
  placeholder='' value={myForm.watch("insuranceNumber")}  />
  
   <MyFormField control={myForm.control} isRequired={false} key='insuranceExpiresAt' label='Assurance Expérer le'
 name='insuranceExpiresAt' onChange={(e:any)=>myForm.setValue("insuranceExpiresAt",e.target.value)}
  placeholder='' value={myForm.watch("insuranceExpiresAt")}  type="date" />

  <MyFormField control={myForm.control} isRequired={false} key='inspectionExpiresAt' label='Controle technique'
 name='inspectionExpiresAt' onChange={(e:any)=>myForm.setValue("inspectionExpiresAt",e.target.value)}
  placeholder='' value={myForm.watch("inspectionExpiresAt")} type="date" />
  
  
<MyFormField control={myForm.control} isRequired={false} key='tachographExpiresAt' label='Inspection tachygraphe'
 name='tachographExpiresAt' onChange={(e:any)=>myForm.setValue("tachographExpiresAt",e.target.value)}
  placeholder='' value={myForm.watch("tachographExpiresAt")} type="date" />
        </AccordionContent>
      </AccordionItem>
     
    </Accordion>

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



export default EditTrucksSheetContent;