/*
  Warnings:

  - You are about to drop the column `tenantId` on the `BoardingHouse` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoardingHouse" DROP CONSTRAINT "BoardingHouse_landlordId_fkey";

-- DropForeignKey
ALTER TABLE "BoardingHouse" DROP CONSTRAINT "BoardingHouse_tenantId_fkey";

-- AlterTable
ALTER TABLE "BoardingHouse" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BoardingHouseListing" (
    "id" SERIAL NOT NULL,
    "landlordId" INTEGER NOT NULL,
    "boardingHouseId" INTEGER NOT NULL,

    CONSTRAINT "BoardingHouseListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantBoardingHouse" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "boardingHouseId" INTEGER NOT NULL,

    CONSTRAINT "TenantBoardingHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardingHouseListing" ADD CONSTRAINT "BoardingHouseListing_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardingHouseListing" ADD CONSTRAINT "BoardingHouseListing_boardingHouseId_fkey" FOREIGN KEY ("boardingHouseId") REFERENCES "BoardingHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantBoardingHouse" ADD CONSTRAINT "TenantBoardingHouse_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantBoardingHouse" ADD CONSTRAINT "TenantBoardingHouse_boardingHouseId_fkey" FOREIGN KEY ("boardingHouseId") REFERENCES "BoardingHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
