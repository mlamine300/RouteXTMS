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