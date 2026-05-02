/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,specialtyId]` on the table `doctor_specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_specialty_doctorId_specialtyId_key" ON "doctor_specialty"("doctorId", "specialtyId");

-- RenameIndex
ALTER INDEX "doctor_specialty_doctorId_idx" RENAME TO "idx_doctor_specialty_doctorId";

-- RenameIndex
ALTER INDEX "doctor_specialty_specialtyId_idx" RENAME TO "idx_doctor_specialty_specialtyId";
