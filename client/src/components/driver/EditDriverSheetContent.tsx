/* eslint-disable @typescript-eslint/no-explicit-any */

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

import{ DRIVER_STATUS, LICENSE_CATEGORY, type Driver, type DriverForm} from "../../types"
import { useEffect, useRef } from 'react';
import {  driverSchema } from '../../types/zod';
 import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form} from "../ui/form";
import MyFormField from "../../components/ui/MyFormField"
import Button from '../ui/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { editDriverAction } from '../../actions/driverActions';

const EditDriverSheetContent = ({driver}:{driver:Driver}) => {

    const myForm = useForm<DriverForm>({
    resolver: zodResolver(driverSchema) as any,

    defaultValues: driver as DriverForm
});

useEffect(() => {
  myForm.reset(driver as DriverForm);
}, [driver.id]);
  const onSubmit = async(data: DriverForm) => {
   
    if(!driver||!driver.id)return;
    await editDriverAction(driver.id,data);
  };

  const ref=useRef<HTMLButtonElement|null>(null);
  
 

  return (
      <SheetContent className="h-full bg-background-base">
  <SheetHeader>
    <SheetTitle className="flex items-center justify-center italic font-semibold">
      {driver
        ? `Conducteur : ${driver.firstName} ${driver.lastName}`
        : "Nouveau Conducteur"}
    </SheetTitle>
  </SheetHeader>

  <Form {...myForm}>
    <form
      onSubmit={myForm.handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center overflow-y-auto"
    >
      <div className="grid grid-cols-2 gap-2">
       

        <MyFormField
          control={myForm.control}
          isRequired
          label="Prénom"
          name="firstName"
          placeholder="Mohamed"
          value={myForm.watch("firstName")}
          onChange={(e: any) => myForm.setValue("firstName", e.target.value)}
        />

        <MyFormField
          control={myForm.control}
          isRequired
          label="Nom"
          name="lastName"
          placeholder="LAOUFI"
          value={myForm.watch("lastName")}
          onChange={(e: any) => myForm.setValue("lastName", e.target.value)}
        />

        <MyFormField
          control={myForm.control}
          isRequired
          label="Téléphone"
          name="phone"
          placeholder="+213..."
          value={myForm.watch("phone")}
          onChange={(e: any) => myForm.setValue("phone", e.target.value)}
        />

        <MyFormField
          control={myForm.control}
          isRequired={false}
          label="Email"
          name="email"
          placeholder="driver@email.com"
          value={myForm.watch("email")}
          onChange={(e: any) => myForm.setValue("email", e.target.value)}
        />

        <MyFormField
          control={myForm.control}
          isRequired
          label="Matricule Employé"
          name="employeeId"
          placeholder="EMP001"
          value={myForm.watch("employeeId")}
          onChange={(e: any) => myForm.setValue("employeeId", e.target.value)}
        />

        <MyFormField
          control={myForm.control}
          isRequired
          label="N° Permis"
          name="licenseNumber"
          placeholder="123456789"
          value={myForm.watch("licenseNumber")}
          onChange={(e: any) =>
            myForm.setValue("licenseNumber", e.target.value)
          }
        />

        <MyFormField
          control={myForm.control}
          isRequired
          label="Date expiration permis"
          placeholder='01-01-1900'
          name="licenseExpiresAt"
          type="date"
          value={myForm.watch("licenseExpiresAt")}
          onChange={(e: any) =>
            myForm.setValue("licenseExpiresAt", e.target.value)
          }
        />

        <MyFormField
          control={myForm.control}
          isRequired={false}
          placeholder='01-01-1900'
          label="Visite médicale"
          name="medicalCheckExpiresAt"
          type="date"
          value={myForm.watch("medicalCheckExpiresAt")}
          onChange={(e: any) =>
            myForm.setValue("medicalCheckExpiresAt", e.target.value)
          }
        />

        <Accordion type="multiple" className="col-span-2">

          <AccordionItem value="license">
            <AccordionTrigger>PERMIS & CONFORMITÉ</AccordionTrigger>

            <AccordionContent className="grid grid-cols-2 gap-2">

              <MyFormField
                control={myForm.control}
                isRequired={false}
                label="Expiration FIMO"
                name="fimoExpiresAt"
                placeholder='01-01-1900'
                type="date"
                value={myForm.watch("fimoExpiresAt")}
                onChange={(e: any) =>
                  myForm.setValue("fimoExpiresAt", e.target.value)
                }
              />

              <MyFormField
                control={myForm.control}
                isRequired
                label="Catégories"
                name="licenseCategories"
                type="select-multiple"
                possibleValues={[...LICENSE_CATEGORY]}
                placeholder='C'
                value={myForm.watch("licenseCategories")}
                onChange={(value: any) =>myForm.setValue("licenseCategories",value)
                }
              />

            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="employment">
            <AccordionTrigger>EMPLOI & STATUT</AccordionTrigger>

            <AccordionContent className="grid grid-cols-2 gap-2">

              <MyFormField
                control={myForm.control}
                isRequired
                placeholder=''
                label="Employé interne"
                name="isEmployee"
                type="boolean"
                
                value={myForm.watch("isEmployee")?"oui":"non"}
                onChange={(value: any) =>
                  myForm.setValue("isEmployee", value==="oui")
                }
              />

              <MyFormField
                control={myForm.control}
                isRequired
                label="Actif"
                name="isActive"
                  placeholder=''
                type="boolean"
                
                value={myForm.watch("isActive")?"oui":"non"}
                onChange={(value: any) =>
                  myForm.setValue("isActive", value==="oui")
                }
              />

              <MyFormField
                control={myForm.control}
                isRequired
                label="Statut"
                name="status"
                type="select"
                  placeholder=''
                possibleValues={[...DRIVER_STATUS]}
                value={myForm.watch("status")}
                onChange={(value: any) =>
                  myForm.setValue("status", value)
                }
              />

              <MyFormField
                control={myForm.control}
                isRequired={false}
                label="Véhicule assigné"
                name="assignedVehicleId"
                  placeholder=''
                type="select"
                possibleValues={[]}
                value={myForm.watch("assignedVehicleId")}
                onChange={(value: any) =>
                  myForm.setValue("assignedVehicleId", value)
                }
              />

            </AccordionContent>
          </AccordionItem>

        </Accordion>

        <Button
          text="Sauvegarder"
          variant="primary"
          className="col-span-2"
        />

      </div>
    </form>
  </Form>

  <SheetClose ref={ref}>
    <p className="border-red-500 text-red-500 hover:text-red-300 hover:border-red-400 w-full mt-auto border">
      Fermer
    </p>
  </SheetClose>
</SheetContent>
  );
};



export default EditDriverSheetContent;