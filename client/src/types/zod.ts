import { z } from "zod";
import {  DRIVER_STATUS, DriverForm, FUEL_TYPE, LICENSE_CATEGORY, VEHICLE_TECHNICAL_STATUS, VEHICLE_TYPE} from "./index"
export const vehicleSchema = z.object({
  assignedParcId:z
    .string()
    .uuid("Invalid Parc ID")
    .optional()
    .nullable(),
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

  isActive: z.boolean().default(true),
});

export const driverSchema = z.object({
  assignedParcId:z
    .string()
    .uuid("Invalid Parc ID")
    .optional()
    .nullable(),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100),

  phone: z
    .string()
    .trim()
    .min(8, "Phone number is too short")
    .max(20),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  isEmployee: z.boolean().default(true),

  employeeId: z
    .string()
    .trim()
    .min(1, "Employee ID is required"),

  licenseNumber: z
    .string()
    .trim()
    .min(1, "License number is required"),

  licenseCategories: z
    .array(z.enum([...LICENSE_CATEGORY]))
    .min(1, "Select at least one license category"),

  licenseExpiresAt: z.coerce.date("please provide a correct date"),
  medicalCheckExpiresAt: z.coerce.date().optional().nullable(),

  fimoExpiresAt: z.coerce.date().optional().nullable(),

  status: z.enum([...DRIVER_STATUS]).default(DRIVER_STATUS[0]),

  isActive: z.boolean().default(true),

  assignedVehicleId: z
    .string()
    .uuid("Invalid vehicle ID")
    .optional()
    .nullable(),

  userId: z
    .string()
    .uuid("Invalid user ID")
    .optional()
    .nullable(),
});




export const vehicleDefaultValues={
  assignedParcId:"",
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

export const driverDefaultValues: DriverForm = {
  assignedParcId:"",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  isEmployee: true,
  employeeId: "",
  licenseNumber: "",
  licenseCategories: [],
  licenseExpiresAt: new Date(),
  medicalCheckExpiresAt: null,
  fimoExpiresAt: null,
  status: DRIVER_STATUS[0],
  isActive: true,
  assignedVehicleId: null,
  userId: null,
};