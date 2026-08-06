/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from "zod";
import type{driverSchema, vehicleSchema} from "./zod"
export interface User{
     id: string;
     token:string;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        phone: string;
        avatarUrl: string;
        language: "FR"|"EN";
        isActive: boolean;
        isLocked: boolean;
        emailVerified: boolean;
        createdAt?: Date;
        updatedAt?:Date;
        deletedAt?: Date;
        roleId: string;
        branchId?: string
}
export interface SimpleMenuItemType {
    id: string;
    label: string;
    icon: any;
    path: string;
}

export interface MenuItemType{
  
    id: string;
    label: string;
    icon: any;
    path: string;
    hasChilds:boolean;
    childs?:SimpleMenuItemType[];
    
  
}

export type Driver = {
  id: string ;
  assignedParcId:string|null;
  userId: string ;
  firstName: string ;
  lastName: string ;
  phone: string ;
  email: string | null
  isEmployee: boolean ;
  employeeId: string ;
  licenseNumber: string ;
  licenseCategories:LicenseCategory[];
  licenseExpiresAt: Date ;
  medicalCheckExpiresAt: Date ;
  fimoExpiresAt: Date ;
  status: DriverStatus;
  isActive: boolean ;
  currentLat: number | null
  currentLng: number | null
  lastLocationUpdate: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  assignedVehicleId: string | null
  assignedVehicle:Vehicle|null
  attachedParc:Parc |null
}
export type Parc={
  id:string|null;
  name:string|null;
  positionLat:number | null;
  positionLng:number | null;
  drivers?:Driver[]|null;
  trailers?:Trailer[]|null;
  vehicles?:Vehicle[]|null;
}
export type Vehicle = {
  id: string | null
   assignedParcId:string|null;
  fleetNumber: string | null
  plateNumber: string | null
  vin: string | null
  make: string | null
  model: string | null
  year: number | null
  type: VehicleType | null
  fuelType: FuelType | null
  status: VehicleTechnicalStatus 
  maxPayloadKg: number | null
  maxVolumeM3: number | null
  euroPalletCap: number | null
  grossWeightKg: number | null
  curbWeightKg: number | null
  isRefrigerated: boolean | null
  tempMinCelsius: number | null
  tempMaxCelsius: number | null
  hasTailLift: boolean | null
  hasHazardousAdr: boolean | null
  insuranceNumber: string | null
  insuranceExpiresAt: Date | null
  inspectionExpiresAt: Date | null
  tachographExpiresAt: Date | null
  currentOdometerKm: number | null
  telematicsDeviceId: string | null
  fuelConsumptionAvg: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
  assignedDriverId: string | null
  attachedTrailerId: string | null
  attachedParcId: string | null
   assignedDriver:Driver |null
   attachedTrailer:Trailer |null
   attachedParc:Parc |null
}
export type Trailer={
    id: string 
     assignedParcId:string|null;
  fleetNumber: string 
  plateNumber: string 
  vin: string 
  make: string 
  model: string 
  year: number 
  type: TrailerType 
  status: TrailerStatus 
  maxPayloadKg: number | null
  maxVolumeM3: number | null
  euroPalletCap: number | null
  internalHeightMeters: number | null
  grossWeightKg: number | null
  isRefrigerated: boolean | null
  reeferEngineHours: number | null
  tempMinCelsius: number | null
  tempMaxCelsius: number | null
  hasTailLift: boolean | null
  hasHazardousAdr: boolean | null
  isDoubleDeck: boolean | null
  insuranceNumber: string | null
  insuranceExpiresAt: Date | null
  inspectionExpiresAt: Date | null
  atpExpiresAt: Date | null
  telematicsDeviceId: string | null
  currentLat: number | null
  currentLng: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
  currentTractorId: string | null
} 



export const DRIVER_STATUS=["AVAILABLE" , "ON_TRIP" , "ON_BREAK" , "OFF_DUTY" , "INACTIVE"] as const;
export type DriverStatus=typeof DRIVER_STATUS[number]

export const LICENSE_CATEGORY=["C" , "CE" , "C1" , "C1E" , "D"] as const;
export type LicenseCategory = typeof LICENSE_CATEGORY[number];
export const VEHICLE_TYPE=["TRACTOR_UNIT" , "SEMI_TRAILER" , "RIGID_TRUCK" , "VAN" , "CONTAINER_CHASSIS"] as const;
export type VehicleType = typeof VEHICLE_TYPE[number] 
export const FUEL_TYPE=["DIESEL" , "ELECTRIC" , "CNG_LNG" , "HYBRID" , "HYDROGEN"] as const;
export type FuelType = typeof FUEL_TYPE[number]
export const VEHICLE_TECHNICAL_STATUS=["OPERATIONAL" , "IN_MAINTENANCE" , "OUT_OF_SERVICE" , "RESERVED"] as const;
export type VehicleTechnicalStatus = typeof VEHICLE_TECHNICAL_STATUS[number];
export const TRAILER_TYPE=["CONTAINER_CHASSIS" , "CURTAINSIDER" , "BOX_TRAILER" , "REEFER" , "FLATBED" , "TANKER" , "TIPPER"] as const
export type TrailerType = typeof TRAILER_TYPE[number];
export const TRAILER_STATUS =["AVAILABLE" , "IN_MAINTENANCE" , "OUT_OF_SERVICE" , "ATTACHED"]as const
export type  TrailerStatus = typeof TRAILER_STATUS[number];




export type VehicleForm = z.infer<typeof vehicleSchema>;
export type DriverForm = z.infer<typeof driverSchema>;