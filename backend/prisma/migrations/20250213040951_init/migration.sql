/*
  Warnings:

  - You are about to drop the column `price` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clinicId` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_profileId_fkey";

-- DropIndex
DROP INDEX "Doctor_profileId_key";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "clinicId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "price",
DROP COLUMN "profileId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
