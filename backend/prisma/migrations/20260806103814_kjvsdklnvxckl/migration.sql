-- DropIndex
DROP INDEX "vehicles_telematics_device_id_key";

-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "assigned_parc_id" TEXT;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "assigned_parc_id" TEXT;

-- CreateTable
CREATE TABLE "parcs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position_lat" DOUBLE PRECISION NOT NULL,
    "position_lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "parcs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parcs_name_key" ON "parcs"("name");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assigned_parc_id_fkey" FOREIGN KEY ("assigned_parc_id") REFERENCES "parcs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_assigned_parc_id_fkey" FOREIGN KEY ("assigned_parc_id") REFERENCES "parcs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
