-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('AVAILABLE', 'ON_TRIP', 'ON_BREAK', 'OFF_DUTY', 'INACTIVE');

-- CreateEnum
CREATE TYPE "LicenseCategory" AS ENUM ('C', 'CE', 'C1', 'C1E', 'D');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('TRACTOR_UNIT', 'SEMI_TRAILER', 'RIGID_TRUCK', 'VAN', 'CONTAINER_CHASSIS');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DIESEL', 'ELECTRIC', 'CNG_LNG', 'HYBRID', 'HYDROGEN');

-- CreateEnum
CREATE TYPE "TechnicalStatus" AS ENUM ('OPERATIONAL', 'IN_MAINTENANCE', 'OUT_OF_SERVICE', 'RESERVED');

-- CreateEnum
CREATE TYPE "TrailerType" AS ENUM ('CURTAINSIDER', 'BOX_TRAILER', 'REEFER', 'FLATBED', 'CONTAINER_CHASSIS', 'TANKER', 'TIPPER');

-- CreateEnum
CREATE TYPE "TrailerStatus" AS ENUM ('AVAILABLE', 'ATTACHED', 'IN_MAINTENANCE', 'OUT_OF_SERVICE');

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "is_employee" BOOLEAN NOT NULL DEFAULT true,
    "employee_id" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "license_categories" "LicenseCategory"[],
    "license_expires_at" DATE NOT NULL,
    "medical_check_expires_at" DATE,
    "fimo_expires_at" DATE,
    "status" "DriverStatus" NOT NULL DEFAULT 'AVAILABLE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "current_lat" DOUBLE PRECISION,
    "current_lng" DOUBLE PRECISION,
    "last_location_update" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "assigned_vehicle_id" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "fleet_number" TEXT,
    "plate_number" TEXT NOT NULL,
    "vin" TEXT,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" "VehicleType" NOT NULL DEFAULT 'RIGID_TRUCK',
    "fuel_type" "FuelType" NOT NULL DEFAULT 'DIESEL',
    "status" "TechnicalStatus" NOT NULL DEFAULT 'OPERATIONAL',
    "max_payload_kg" DOUBLE PRECISION NOT NULL,
    "max_volume_m3" DOUBLE PRECISION NOT NULL,
    "euro_pallet_cap" INTEGER,
    "gross_weight_kg" DOUBLE PRECISION,
    "curb_weight_kg" DOUBLE PRECISION,
    "is_refrigerated" BOOLEAN NOT NULL DEFAULT false,
    "temp_min_celsius" DOUBLE PRECISION,
    "temp_max_celsius" DOUBLE PRECISION,
    "has_tail_lift" BOOLEAN NOT NULL DEFAULT false,
    "has_hazardous_adr" BOOLEAN NOT NULL DEFAULT false,
    "insurance_number" TEXT,
    "insurance_expires_at" DATE,
    "inspection_expires_at" DATE,
    "tachograph_expires_at" DATE,
    "current_odometer_km" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "telematics_device_id" TEXT,
    "fuel_consumption_avg" DOUBLE PRECISION,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "assigned_driver_id" TEXT,
    "attached_trailer_id" TEXT,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trailers" (
    "id" TEXT NOT NULL,
    "fleet_number" TEXT,
    "plate_number" TEXT NOT NULL,
    "vin" TEXT,
    "make" TEXT NOT NULL,
    "model" TEXT,
    "year" INTEGER NOT NULL,
    "type" "TrailerType" NOT NULL DEFAULT 'CURTAINSIDER',
    "status" "TrailerStatus" NOT NULL DEFAULT 'AVAILABLE',
    "max_payload_kg" DOUBLE PRECISION NOT NULL,
    "max_volume_m3" DOUBLE PRECISION NOT NULL,
    "euro_pallet_cap" INTEGER NOT NULL DEFAULT 33,
    "internal_height_meters" DOUBLE PRECISION,
    "gross_weight_kg" DOUBLE PRECISION,
    "is_refrigerated" BOOLEAN NOT NULL DEFAULT false,
    "reefer_engine_hours" DOUBLE PRECISION,
    "temp_min_celsius" DOUBLE PRECISION,
    "temp_max_celsius" DOUBLE PRECISION,
    "has_tail_lift" BOOLEAN NOT NULL DEFAULT false,
    "has_hazardous_adr" BOOLEAN NOT NULL DEFAULT false,
    "is_double_deck" BOOLEAN NOT NULL DEFAULT false,
    "insurance_number" TEXT,
    "insurance_expires_at" DATE,
    "inspection_expires_at" DATE,
    "atp_expires_at" DATE,
    "telematics_device_id" TEXT,
    "current_lat" DOUBLE PRECISION,
    "current_lng" DOUBLE PRECISION,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "current_tractor_id" TEXT,

    CONSTRAINT "trailers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "driver_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT,
    "trailerId" TEXT,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_maintenances" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "odometer_km" DOUBLE PRECISION NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "next_due_km" DOUBLE PRECISION,

    CONSTRAINT "vehicle_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trailer_maintenances" (
    "id" TEXT NOT NULL,
    "trailer_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trailer_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_status_logs" (
    "id" BIGSERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "previous_status" "DriverStatus",
    "new_status" "DriverStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipment_id" TEXT,

    CONSTRAINT "driver_status_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_user_id_key" ON "drivers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "drivers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_license_number_key" ON "drivers"("license_number");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_assigned_vehicle_id_key" ON "drivers"("assigned_vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_fleet_number_key" ON "vehicles"("fleet_number");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_number_key" ON "vehicles"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vin_key" ON "vehicles"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_telematics_device_id_key" ON "vehicles"("telematics_device_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_assigned_driver_id_key" ON "vehicles"("assigned_driver_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_attached_trailer_id_key" ON "vehicles"("attached_trailer_id");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_fleet_number_key" ON "trailers"("fleet_number");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_plate_number_key" ON "trailers"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_vin_key" ON "trailers"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_telematics_device_id_key" ON "trailers"("telematics_device_id");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_current_tractor_id_key" ON "trailers"("current_tractor_id");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_code_key" ON "shipments"("code");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assigned_vehicle_id_fkey" FOREIGN KEY ("assigned_vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_current_tractor_id_fkey" FOREIGN KEY ("current_tractor_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "trailers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_maintenances" ADD CONSTRAINT "vehicle_maintenances_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailer_maintenances" ADD CONSTRAINT "trailer_maintenances_trailer_id_fkey" FOREIGN KEY ("trailer_id") REFERENCES "trailers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_status_logs" ADD CONSTRAINT "driver_status_logs_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_status_logs" ADD CONSTRAINT "driver_status_logs_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
