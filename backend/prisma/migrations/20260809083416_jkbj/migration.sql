/*
  Warnings:

  - A unique constraint covering the columns `[assigned_driver_id]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "assigned_driver_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_assigned_driver_id_key" ON "vehicles"("assigned_driver_id");
