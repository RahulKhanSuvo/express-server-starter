-- DropIndex
DROP INDEX "idx_patient_userId";

-- CreateIndex
CREATE INDEX "idx_patient_email" ON "patient"("email");
