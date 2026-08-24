/*
  Warnings:

  - Added the required column `assigned_parc_id` to the `trailers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trailers" ADD COLUMN     "assigned_parc_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_assigned_parc_id_fkey" FOREIGN KEY ("assigned_parc_id") REFERENCES "parcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
