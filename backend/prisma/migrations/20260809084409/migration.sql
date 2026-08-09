/*
  Warnings:

  - You are about to drop the column `assigned_driver_id` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "vehicles_assigned_driver_id_key";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "assigned_driver_id";
