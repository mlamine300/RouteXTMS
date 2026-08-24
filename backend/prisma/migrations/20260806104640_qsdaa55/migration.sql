/*
  Warnings:

  - Made the column `assigned_parc_id` on table `drivers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assigned_parc_id` on table `vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_assigned_parc_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_assigned_parc_id_fkey";

-- AlterTable
ALTER TABLE "drivers" ALTER COLUMN "assigned_parc_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "assigned_parc_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assigned_parc_id_fkey" FOREIGN KEY ("assigned_parc_id") REFERENCES "parcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_assigned_parc_id_fkey" FOREIGN KEY ("assigned_parc_id") REFERENCES "parcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
