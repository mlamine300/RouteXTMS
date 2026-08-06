/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useEffect } from "react";
import { DRIVER_STATUS, DriverForm,   LICENSE_CATEGORY } from "../../types";

import { Form } from "../ui/form";
import MyFormField from "../ui/MyFormField";

import Button from "../ui/Button";
import { UseFormReturn } from "react-hook-form";

import { addDriverAction } from "../../actions/driverActions";
import { driverDefaultValues } from "../../types/zod";
import { BrushCleaning } from "lucide-react";


const AddDriverForm = ({form}:{form:UseFormReturn<DriverForm>}) => {


console.log(form.getValues())
  const onSubmit = async(data: DriverForm) => {
   console.log(data)
  //
  const driver=await addDriverAction(data);
  if(driver)
  form.reset(driverDefaultValues)
    //await addTruckAction(data)
  };

  


  return (
      <div className='h-full bg-background-base flex flex-col items-center'>
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center"
    >
       <div className="flex justify-between w-10/12 ">
      <p className="text-lg font-bold">Ajouter un Chauffeur</p>
      <button onClick={()=>form.reset(driverDefaultValues)} className="flex gap-4 border-primary border rounded px-2 hover:font-bold active:bg-primary/50 group">
        Effacer
        <BrushCleaning className="group-hover:rotate-30 duration-300"/>
      </button>
    </div>
      <div className="grid grid-cols-2 gap-2">

        <MyFormField
          control={form.control}
          isRequired
          label="Prénom"
          name="firstName"
          placeholder="Mohamed"
          value={form.watch("firstName")}
          onChange={(e: any) => form.setValue("firstName", e.target.value)}
        />

        <MyFormField
          control={form.control}
          isRequired
          label="Nom"
          name="lastName"
          placeholder="LAOUFI"
          value={form.watch("lastName")}
          onChange={(e: any) => form.setValue("lastName", e.target.value)}
        />

        <MyFormField
          control={form.control}
          isRequired
          label="Téléphone"
          name="phone"
          placeholder="+213..."
          value={form.watch("phone")}
          onChange={(e: any) => form.setValue("phone", e.target.value)}
        />

        <MyFormField
          control={form.control}
          isRequired={false}
          label="Email"
          name="email"
          placeholder="driver@email.com"
          value={form.watch("email")}
          onChange={(e: any) => form.setValue("email", e.target.value)}
        />

        <MyFormField
          control={form.control}
          isRequired
          label="Matricule Employé"
          name="employeeId"
          placeholder="EMP001"
          value={form.watch("employeeId")}
          onChange={(e: any) => form.setValue("employeeId", e.target.value)}
        />

        <MyFormField
          control={form.control}
          isRequired
          label="N° Permis"
          name="licenseNumber"
          placeholder="123456789"
          value={form.watch("licenseNumber")}
          onChange={(e: any) =>
            form.setValue("licenseNumber", e.target.value)
          }
        />

        <MyFormField
          control={form.control}
          isRequired
          label="Date expiration permis"
          placeholder='01-01-1900'
          name="licenseExpiresAt"
          type="date"
          value={form.watch("licenseExpiresAt")}
          onChange={(e: any) =>
            form.setValue("licenseExpiresAt", e.target.value)
          }
        />

        <MyFormField
          control={form.control}
          isRequired={false}
          placeholder='01-01-1900'
          label="Visite médicale"
          name="medicalCheckExpiresAt"
          type="date"
          value={form.watch("medicalCheckExpiresAt")}
          onChange={(e: any) =>
            form.setValue("medicalCheckExpiresAt", e.target.value)
          }
        />


              <MyFormField
                control={form.control}
                isRequired={false}
                label="Expiration FIMO"
                name="fimoExpiresAt"
                placeholder='01-01-1900'
                type="date"
                value={form.watch("fimoExpiresAt")}
                onChange={(e: any) =>
                  form.setValue("fimoExpiresAt", e.target.value)
                }
              />

              <MyFormField
                control={form.control}
                isRequired
                label="Catégories"
                name="licenseCategories"
                type="select-multiple"
                possibleValues={[...LICENSE_CATEGORY]}
                placeholder='C'
                value={form.watch("licenseCategories")}
                onChange={(value: any) =>form.setValue("licenseCategories",value)
                }
              />

           

              <MyFormField
                control={form.control}
                isRequired
                placeholder=''
                label="Employé interne"
                name="isEmployee"
                type="select"
                value={form.watch("isEmployee")?"true":"false"}
                possibleValues={["true","false"]}
                onChange={(value: any) =>
                  form.setValue("isEmployee", value==="true")
                }
              />

              <MyFormField
                control={form.control}
                isRequired
                label="Actif"
                name="isActive"
                  placeholder=''
                type="boolean"
                
                value={form.watch("isActive")?"oui":"non"}
                onChange={(value: any) =>
                  form.setValue("isActive", value==="oui")
                }
              />

              <MyFormField
                control={form.control}
                isRequired
                label="Statut"
                name="status"
                type="select"
                  placeholder=''
                possibleValues={[...DRIVER_STATUS]}
                value={form.watch("status")}
                onChange={(value: any) =>
                  form.setValue("status", value)
                }
              />

              <MyFormField
                control={form.control}
                isRequired={false}
                label="Véhicule assigné"
                name="assignedVehicleId"
                  placeholder=''
                type="select"
                possibleValues={[]}
                value={form.watch("assignedVehicleId")}
                onChange={(value: any) =>
                  form.setValue("assignedVehicleId", value)
                }
              />

           

        <Button
          text="Sauvegarder"
          variant="primary"
          className="col-span-2"
        />

      </div>
    </form>
  </Form>
                
     
     
  </div>
  );
};


export default AddDriverForm
