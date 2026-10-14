/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseFormReturn } from "react-hook-form";


import { Form } from "../ui/form";
import MyFormField from "../ui/MyFormField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Button from "../ui/Button";

import { BrushCleaning } from "lucide-react";


import { addTrailerAction } from "../../actions/trailerAction";
import { CreateTrailerInput, Parc, TrailerForm } from "../../types";
import { trailerDefaultValues } from "../../types/zod";

const TRAILER_TYPE = [
  "CURTAINSIDER",
  "REFRIGERATED",
  "FLATBED",
  "BOX",
  "TANKER",
  "LOW_LOADER",
] as const;

const TRAILER_STATUS = [
  "AVAILABLE",
  "IN_USE",
  "MAINTENANCE",
  "OUT_OF_SERVICE",
] as const;

type AddTrailerFormProps = {
  form: UseFormReturn<TrailerForm, unknown, CreateTrailerInput>;
  parcs:Parc[]
};

const AddTrailerForm = ({ form,parcs }: AddTrailerFormProps) => {
  const onSubmit = async (data: CreateTrailerInput) => {
   
    await addTrailerAction({...data,assignedParcId:parcs.find(p=>p.name===data.assignedParcName)?.id||"-"});
  form.reset(trailerDefaultValues)
  };

  return (
    <div className="h-full bg-background-base flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-200 bg-background-base rounded-lg shadow-2xl p-4 flex flex-col items-center"
        >
          {/* EN-TÊTE */}
          <div className="flex justify-between items-center w-10/12">
            <p className="text-lg font-bold">Ajouter une remorque</p>

            <button
              type="button"
              onClick={() => form.reset(trailerDefaultValues)}
              className="flex gap-4 border-primary border rounded px-2 hover:font-bold active:bg-primary/50 group"
            >
              Effacer
              <BrushCleaning className="group-hover:rotate-30 duration-300" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            {/* INFORMATIONS GÉNÉRALES */}
            <MyFormField
              control={form.control}
              isRequired={false}
              key="fleetNumber"
              label="N° de fleet"
              name="fleetNumber"
              onChange={(e: any) =>
                form.setValue("fleetNumber", e.target.value)
              }
              placeholder="TRL-102"
              value={form.watch("fleetNumber")}
            />

            <MyFormField
              control={form.control}
              isRequired={true}
              key="plateNumber"
              label="Immatriculation"
              name="plateNumber"
              onChange={(e: any) =>
                form.setValue("plateNumber", e.target.value)
              }
              placeholder="AB-123-CD"
              value={form.watch("plateNumber")}
            />

            <MyFormField
              control={form.control}
              isRequired={false}
              key="vin"
              label="N° de châssis (VIN)"
              name="vin"
              onChange={(e: any) => form.setValue("vin", e.target.value)}
              placeholder="Numéro de châssis"
              value={form.watch("vin")}
            />

            <MyFormField
              control={form.control}
              isRequired={true}
              key="make"
              label="Constructeur"
              name="make"
              onChange={(e: any) => form.setValue("make", e.target.value)}
              placeholder="Schmitz Cargobull"
              value={form.watch("make")}
            />

            <MyFormField
              control={form.control}
              isRequired={false}
              key="model"
              label="Modèle"
              name="model"
              onChange={(e: any) => form.setValue("model", e.target.value)}
              placeholder="S.KO"
              value={form.watch("model")}
            />

            <MyFormField
              control={form.control}
              isRequired={true}
              key="year"
              label="Année de fabrication"
              name="year"
              type="number"
              onChange={(e: any) =>
                form.setValue("year", Number(e.target.value))
              }
              placeholder="2025"
              value={form.watch("year")}
            />

            <MyFormField
              control={form.control}
              isRequired={true}
              key="type"
              label="Type de remorque"
              name="type"
              type="select"
              possibleValues={[...TRAILER_TYPE]}
              onChange={(value: any) => form.setValue("type", value)}
              value={form.watch("type")}
              placeholder="Choisir un type"
            />

            <MyFormField
              control={form.control}
              isRequired={true}
              key="status"
              label="Statut"
              name="status"
              type="select"
              possibleValues={[...TRAILER_STATUS]}
              onChange={(value: any) => form.setValue("status", value)}
              value={form.watch("status")}
              placeholder="Choisir un statut"
            />

            {/* CAPACITÉ ET DIMENSIONS */}
            <Accordion type="multiple" className="col-span-2">
              <AccordionItem value="capacity">
                <AccordionTrigger>
                  CAPACITÉ ET DIMENSIONS
                </AccordionTrigger>

                <AccordionContent className="grid grid-cols-2 gap-2">
                  <MyFormField
                    control={form.control}
                    isRequired={true}
                    key="maxPayloadKg"
                    label="Charge utile maximale (kg)"
                    name="maxPayloadKg"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue("maxPayloadKg", Number(e.target.value))
                    }
                    placeholder="25000"
                    value={form.watch("maxPayloadKg")}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={true}
                    key="maxVolumeM3"
                    label="Volume maximal (m³)"
                    name="maxVolumeM3"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue("maxVolumeM3", Number(e.target.value))
                    }
                    placeholder="90"
                    value={form.watch("maxVolumeM3")}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={true}
                    key="euroPalletCap"
                    label="Capacité en palettes"
                    name="euroPalletCap"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue("euroPalletCap", Number(e.target.value))
                    }
                    placeholder="33"
                    value={form.watch("euroPalletCap")}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="internalHeightMeters"
                    label="Hauteur intérieure (m)"
                    name="internalHeightMeters"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "internalHeightMeters",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="2.70"
                    value={form.watch("internalHeightMeters") ?? ""}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="grossWeightKg"
                    label="Poids total autorisé (kg)"
                    name="grossWeightKg"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "grossWeightKg",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="38000"
                    value={form.watch("grossWeightKg") ?? ""}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* ÉQUIPEMENTS SPÉCIFIQUES */}
              <AccordionItem value="equipment">
                <AccordionTrigger>
                  ÉQUIPEMENTS ET TRANSPORT SPÉCIALISÉ
                </AccordionTrigger>

                <AccordionContent className="grid grid-cols-2 gap-2">
                  <MyFormField
                  placeholder="is refrigerated"
                    control={form.control}
                    isRequired={false}
                    key="isRefrigerated"
                    label="Remorque frigorifique"
                    name="isRefrigerated"
                    onChange={(value: any) =>
                      form.setValue("isRefrigerated", value)
                    }
                    value={form.watch("isRefrigerated")}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="reeferEngineHours"
                    label="Heures du groupe frigorifique"
                    name="reeferEngineHours"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "reeferEngineHours",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="1200"
                    value={form.watch("reeferEngineHours") ?? ""}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="tempMinCelsius"
                    label="Température minimale (°C)"
                    name="tempMinCelsius"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "tempMinCelsius",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="-25"
                    value={form.watch("tempMinCelsius") ?? ""}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="tempMaxCelsius"
                    label="Température maximale (°C)"
                    name="tempMaxCelsius"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "tempMaxCelsius",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="25"
                    value={form.watch("tempMaxCelsius") ?? ""}
                  />

                  <MyFormField
                  placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="hasTailLift"
                    label="Présence d'un hayon élévateur"
                    name="hasTailLift"
                    onChange={(value: any) =>
                      form.setValue("hasTailLift", value)
                    }
                    value={form.watch("hasTailLift")}
                  />

                  <MyFormField
                   placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="hasHazardousAdr"
                    label="Autorisation ADR"
                    name="hasHazardousAdr"
                    onChange={(value: any) =>
                      form.setValue("hasHazardousAdr", value)
                    }
                    value={form.watch("hasHazardousAdr")}
                  />

                  <MyFormField
                   placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="isDoubleDeck"
                    label="Double étage"
                    name="isDoubleDeck"
                    onChange={(value: any) =>
                      form.setValue("isDoubleDeck", value)
                    }
                    value={form.watch("isDoubleDeck")}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* ASSURANCE ET CONTRÔLES */}
              <AccordionItem value="regulatory">
                <AccordionTrigger>
                  ASSURANCE ET CONFORMITÉ RÉGLEMENTAIRE
                </AccordionTrigger>

                <AccordionContent className="grid grid-cols-2 gap-2">
                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="insuranceNumber"
                    label="N° de contrat d'assurance"
                    name="insuranceNumber"
                    onChange={(e: any) =>
                      form.setValue("insuranceNumber", e.target.value)
                    }
                    placeholder="N° de contrat"
                    value={form.watch("insuranceNumber")}
                  />

                  <MyFormField
                   placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="insuranceExpiresAt"
                    label="Expiration de l'assurance"
                    name="insuranceExpiresAt"
                    type="date"
                    onChange={(e: any) =>
                      form.setValue("insuranceExpiresAt", e.target.value)
                    }
                    value={form.watch("insuranceExpiresAt") ?? ""}
                  />

                  <MyFormField
                   placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="inspectionExpiresAt"
                    label="Expiration du contrôle technique"
                    name="inspectionExpiresAt"
                    type="date"
                    onChange={(e: any) =>
                      form.setValue("inspectionExpiresAt", e.target.value)
                    }
                    value={form.watch("inspectionExpiresAt") ?? ""}
                  />

                  <MyFormField
                   placeholder="oui / non"
                    control={form.control}
                    isRequired={false}
                    key="atpExpiresAt"
                    label="Expiration du certificat ATP"
                    name="atpExpiresAt"
                    type="date"
                    onChange={(e: any) =>
                      form.setValue("atpExpiresAt", e.target.value)
                    }
                    value={form.watch("atpExpiresAt") ?? ""}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* TÉLÉMATIQUE ET LOCALISATION */}
              <AccordionItem value="telematics">
                <AccordionTrigger>
                  TÉLÉMATIQUE ET GÉOLOCALISATION
                </AccordionTrigger>

                <AccordionContent className="grid grid-cols-2 gap-2">
                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="telematicsDeviceId"
                    label="Identifiant du boîtier GPS"
                    name="telematicsDeviceId"
                    onChange={(e: any) =>
                      form.setValue("telematicsDeviceId", e.target.value)
                    }
                    placeholder="GPS-TRL-001"
                    value={form.watch("telematicsDeviceId")}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="currentLat"
                    label="Latitude actuelle"
                    name="currentLat"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "currentLat",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="48.8566"
                    value={form.watch("currentLat") ?? ""}
                  />

                  <MyFormField
                    control={form.control}
                    isRequired={false}
                    key="currentLng"
                    label="Longitude actuelle"
                    name="currentLng"
                    type="number"
                    onChange={(e: any) =>
                      form.setValue(
                        "currentLng",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder="2.3522"
                    value={form.watch("currentLng") ?? ""}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* AFFECTATION */}
              <AccordionItem value="assignment">
                <AccordionTrigger>
                  AFFECTATION AU PARC
                </AccordionTrigger>

                <AccordionContent className="grid grid-cols-2 gap-2">
                  <MyFormField
                    control={form.control}
                    isRequired={true}
                    type="select"
                    key="assignedParcId"
                    label="Parc de rattachement"
                    name="assignedParcName"
                    possibleValues={parcs.map(p=>p.name) as string[]}
                    onChange={(e: any) =>
                      form.setValue("assignedParcName", parcs.find(p=>p.name===e)?.name||"0")
                    }
                    placeholder="Identifiant du parc"
                    value={form.watch("assignedParcName")}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion> 

            {/* BOUTON DE VALIDATION */}
            <div className="col-span-2">
              <Button
                text="Enregistrer la remorque"
                variant="primary"
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddTrailerForm;