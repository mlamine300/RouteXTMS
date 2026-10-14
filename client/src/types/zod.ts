import { z } from "zod";
import {  DRIVER_STATUS, FUEL_TYPE, LICENSE_CATEGORY, TrailerForm, VEHICLE_TECHNICAL_STATUS, VEHICLE_TYPE, type DriverForm} from "./index"
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

export const parcSchema=z.object({
  name:z.string()
    .trim()
    .min(2, "nom devrait etre entre 2 et 100 caracteres")
    .max(100),
  positionLat: z.float32("position latitude devrait etre un float"),
  positionLng: z.float32("position longitude devrait être un float"),
  

})




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



// --- TYPES DE REMORQUE ---
export const trailerTypeEnum = z.enum([
  "CURTAINSIDER",
  "REFRIGERATED",
  "FLATBED",
  "BOX",
  "TANKER",
  "LOW_LOADER",
]);

// --- STATUTS DE REMORQUE ---
export const trailerStatusEnum = z.enum([
  "AVAILABLE",
  "IN_USE",
  "MAINTENANCE",
  "OUT_OF_SERVICE",
]);

export const trailerFormSchema = z
  .object({
    // --- INFORMATIONS GÉNÉRALES ---
    fleetNumber: z.string().trim().optional().or(z.literal("")),
    plateNumber: z
      .string()
      .trim()
      .min(1, "Le numéro d'immatriculation est obligatoire"),

    vin: z.string().trim().optional().or(z.literal("")),

    make: z
      .string()
      .trim()
      .min(1, "La marque de la remorque est obligatoire"),

    model: z.string().trim().optional().or(z.literal("")),

    year: z.coerce
      .number()
      .int("L'année doit être un nombre entier")
      .min(1900, "L'année doit être supérieure ou égale à 1900")
      .max(
        new Date().getFullYear() + 1,
        "L'année ne peut pas être supérieure à l'année prochaine",
      ),

    type: trailerTypeEnum.default("CURTAINSIDER"),
    status: trailerStatusEnum.default("AVAILABLE"),

    // --- CAPACITÉ ET DIMENSIONS ---
    maxPayloadKg: z.coerce
      .number()
      .positive("La charge utile maximale doit être supérieure à 0"),

    maxVolumeM3: z.coerce
      .number()
      .positive("Le volume maximal doit être supérieur à 0"),

    euroPalletCap: z.coerce
      .number()
      .int("La capacité en palettes doit être un nombre entier")
      .positive("La capacité en palettes doit être supérieure à 0")
      .default(33),

    internalHeightMeters: z.coerce
      .number()
      .positive("La hauteur intérieure doit être supérieure à 0")
      .optional()
      .nullable(),

    grossWeightKg: z.coerce
      .number()
      .positive("Le poids total autorisé doit être supérieur à 0")
      .optional()
      .nullable(),

    // --- ÉQUIPEMENTS ET TRANSPORT SPÉCIALISÉ ---
    isRefrigerated: z.boolean().default(false),

    reeferEngineHours: z.coerce
      .number()
      .min(0, "Le nombre d'heures du groupe frigorifique ne peut pas être négatif")
      .optional()
      .nullable(),

    tempMinCelsius: z.coerce
      .number()
      .optional()
      .nullable(),

    tempMaxCelsius: z.coerce
      .number()
      .optional()
      .nullable(),

    hasTailLift: z.boolean().default(false),
    hasHazardousAdr: z.boolean().default(false),
    isDoubleDeck: z.boolean().default(false),

    // --- ASSURANCE ET CONTRÔLES RÉGLEMENTAIRES ---
    insuranceNumber: z.string().trim().optional().or(z.literal("")),

    insuranceExpiresAt: z
      .union([z.string(), z.date()])
      .optional()
      .nullable()
      .transform((value) => {
        if (!value || value === "") return null;
        return value instanceof Date ? value : new Date(value);
      }),

    inspectionExpiresAt: z
      .union([z.string(), z.date()])
      .optional()
      .nullable()
      .transform((value) => {
        if (!value || value === "") return null;
        return value instanceof Date ? value : new Date(value);
      }),

    atpExpiresAt: z
      .union([z.string(), z.date()])
      .optional()
      .nullable()
      .transform((value) => {
        if (!value || value === "") return null;
        return value instanceof Date ? value : new Date(value);
      }),

    // --- TÉLÉMATIQUE ET GÉOLOCALISATION ---
    telematicsDeviceId: z.string().trim().optional().or(z.literal("")),

    currentLat: z.coerce
      .number()
      .min(-90, "La latitude doit être supérieure ou égale à -90")
      .max(90, "La latitude doit être inférieure ou égale à 90")
      .optional()
      .nullable(),

    currentLng: z.coerce
      .number()
      .min(-180, "La longitude doit être supérieure ou égale à -180")
      .max(180, "La longitude doit être inférieure ou égale à 180")
      .optional()
      .nullable(),

    // --- AFFECTATION ---
    assignedParcName: z
      .string()
      .min(1, "Le parc de rattachement est obligatoire"),
  })

  // Vérification de la cohérence des températures
  .refine(
    (data) =>
      data.tempMinCelsius == null ||
      data.tempMaxCelsius == null ||
      data.tempMinCelsius <= data.tempMaxCelsius,
    {
      message:
        "La température minimale ne peut pas dépasser la température maximale",
      path: ["tempMinCelsius"],
    },
  )

  // Les limites de température sont obligatoires pour une remorque frigorifique
  .refine(
    (data) =>
      !data.isRefrigerated ||
      (data.tempMinCelsius != null && data.tempMaxCelsius != null),
    {
      message:
        "Les températures minimale et maximale sont obligatoires pour une remorque frigorifique",
      path: ["tempMinCelsius"],
    },
  )

  // Le nombre d'heures du groupe frigorifique est obligatoire si la remorque est frigorifique
  .refine(
    (data) =>
      !data.isRefrigerated || data.reeferEngineHours != null,
    {
      message:
        "Le nombre d'heures du groupe frigorifique est obligatoire pour une remorque frigorifique",
      path: ["reeferEngineHours"],
    },
  );






  export const trailerDefaultValues: TrailerForm = {
  // --- INFORMATIONS GÉNÉRALES ---
  fleetNumber: "",
  plateNumber: "",
  vin: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  type: "CURTAINSIDER",
  status: "AVAILABLE",

  // --- CAPACITÉ ET DIMENSIONS ---
  maxPayloadKg: 0,
  maxVolumeM3: 0,
  euroPalletCap: 33,
  internalHeightMeters: null,
  grossWeightKg: null,

  // --- ÉQUIPEMENTS ET TRANSPORT SPÉCIALISÉ ---
  isRefrigerated: false,
  reeferEngineHours: null,
  tempMinCelsius: null,
  tempMaxCelsius: null,
  hasTailLift: false,
  hasHazardousAdr: false,
  isDoubleDeck: false,

  // --- ASSURANCE ET CONTRÔLES RÉGLEMENTAIRES ---
  insuranceNumber: "",
  insuranceExpiresAt: null,
  inspectionExpiresAt: null,
  atpExpiresAt: null,

  // --- TÉLÉMATIQUE ET GÉOLOCALISATION ---
  telematicsDeviceId: "",
  currentLat: null,
  currentLng: null,

  // --- AFFECTATION ---
  assignedParcName: "",
};


