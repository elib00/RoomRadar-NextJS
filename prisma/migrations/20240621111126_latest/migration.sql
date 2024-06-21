/*
  Warnings:

  - You are about to drop the column `landlordId` on the `BoardingHouse` table. All the data in the column will be lost.
  - You are about to drop the `BoardingHouseListing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantBoardingHouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoardingHouseListing" DROP CONSTRAINT "BoardingHouseListing_boardingHouseId_fkey";

-- DropForeignKey
ALTER TABLE "BoardingHouseListing" DROP CONSTRAINT "BoardingHouseListing_landlordId_fkey";

-- DropForeignKey
ALTER TABLE "TenantBoardingHouse" DROP CONSTRAINT "TenantBoardingHouse_boardingHouseId_fkey";

-- DropForeignKey
ALTER TABLE "TenantBoardingHouse" DROP CONSTRAINT "TenantBoardingHouse_tenantId_fkey";

-- AlterTable
ALTER TABLE "BoardingHouse" DROP COLUMN "landlordId";

-- DropTable
DROP TABLE "BoardingHouseListing";

-- DropTable
DROP TABLE "TenantBoardingHouse";

-- CreateTable
CREATE TABLE "AccountBoardingHouse" (
    "accountId" INTEGER NOT NULL,
    "boardingHouseId" INTEGER NOT NULL,

    CONSTRAINT "AccountBoardingHouse_pkey" PRIMARY KEY ("accountId","boardingHouseId")
);

-- CreateTable
CREATE TABLE "AccountListing" (
    "accountId" INTEGER NOT NULL,
    "boardingHouseId" INTEGER NOT NULL,

    CONSTRAINT "AccountListing_pkey" PRIMARY KEY ("accountId","boardingHouseId")
);

-- AddForeignKey
ALTER TABLE "AccountBoardingHouse" ADD CONSTRAINT "AccountBoardingHouse_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountBoardingHouse" ADD CONSTRAINT "AccountBoardingHouse_boardingHouseId_fkey" FOREIGN KEY ("boardingHouseId") REFERENCES "BoardingHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountListing" ADD CONSTRAINT "AccountListing_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountListing" ADD CONSTRAINT "AccountListing_boardingHouseId_fkey" FOREIGN KEY ("boardingHouseId") REFERENCES "BoardingHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
