/*
  Warnings:

  - You are about to drop the `CarsImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarsImage" DROP CONSTRAINT "CarsImage_car_id_fkey";

-- DropTable
DROP TABLE "CarsImage";

-- CreateTable
CREATE TABLE "carsImages" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carsImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carsImages" ADD CONSTRAINT "carsImages_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
