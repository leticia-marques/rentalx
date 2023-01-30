-- CreateTable
CREATE TABLE "CarsImage" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarsImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarsImage" ADD CONSTRAINT "CarsImage_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
