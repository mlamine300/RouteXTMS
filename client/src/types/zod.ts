import { z } from "zod";
import {  FUEL_TYPE, VEHICLE_TECHNICAL_STATUS, VEHICLE_TYPE} from "./index"
export const vehicleSchema = z.object({
  fleetNumber: z.string().optional(),
  plateNumber: z.string().min(1),
  vin: z.string().optional(),

  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1990).max(new Date().getFullYear() + 1),

  type: z.enum(VEHICLE_TYPE),
  fuelType: z.enum(FUEL_TYPE),
  status: z.enum(VEHICLE_TECHNICAL_STATUS),

  maxPayloadKg: z.number().positive(),
  maxVolumeM3: z.number().positive(),

  euroPalletCap: z.number().nullable().optional(),
  grossWeightKg: z.number().nullable().optional(),
  curbWeightKg: z.number().nullable().optional(),

  isRefrigerated: z.boolean(),
  tempMinCelsius: z.number().nullable().optional(),
  tempMaxCelsius: z.number().nullable().optional(),

  hasTailLift: z.boolean(),
  hasHazardousAdr: z.boolean(),

  insuranceNumber: z.string().optional(),
  insuranceExpiresAt: z.date().nullable().optional(),

  inspectionExpiresAt: z.date().nullable().optional(),
  tachographExpiresAt: z.date().nullable().optional(),

  currentOdometerKm: z.number().min(0),

  telematicsDeviceId: z.string().optional(),

  fuelConsumptionAvg: z.number().nullable().optional(),

  isActive: z.boolean(),
});

export const vehicleDefaultValues={
    fleetNumber:  "",
    plateNumber:  "",
    vin:  "",

    make:  "",
    model:  "",
    year: 1901,

    type:  VEHICLE_TYPE[0],
    fuelType:  FUEL_TYPE[0],
    status:  VEHICLE_TECHNICAL_STATUS[0],

    maxPayloadKg:  0,
    maxVolumeM3:  0,

    euroPalletCap: 0,
    grossWeightKg: 0,
    curbWeightKg: 0,

    isRefrigerated: false,
    tempMinCelsius: 0,
    tempMaxCelsius: 0,

    hasTailLift:  false,
    hasHazardousAdr:false,

    insuranceNumber: "",
    insuranceExpiresAt: new Date("01-01-1901"),

    inspectionExpiresAt: new Date("01-01-1901"),
    tachographExpiresAt: new Date("01-01-1901"),

    currentOdometerKm: 0,

    telematicsDeviceId:  "",
    fuelConsumptionAvg: 0,
isActive: true,};