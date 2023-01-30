/*
  Warnings:

  - You are about to drop the column `endDate` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `expecteed_return_date` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `rentals` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected_return_date` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "endDate",
DROP COLUMN "expecteed_return_date",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expected_return_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
