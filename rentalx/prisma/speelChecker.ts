// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Categories {
  id          String   @id @default(uuid())
  name        String
  description String
  created_at  DateTime @default(now())
  Cars        Cars[]

  @@map("categories")
}

model Specifications {
  id          String   @id @default(uuid())
  name        String
  description String
  created_at  DateTime @default(now())
  cars        Cars[]

  @@map("specifications")
}

model Users {
  id             String   @id @default(uuid())
  name           String
  // username        String  @unique
  password       String
  email          String
  driver_license String
  isAdmin        Boolean  @default(false)
  avatar         String?
  created_at     DateTime @default(now())
  Rentals        Rentals?

  @@map("users")
}

model Cars {
  id             String           @id @default(uuid())
  name           String
  description    String
  daily_rate     Float
  available      Boolean          @default(true)
  license_plate  String
  fine_amount    Float
  brand          String
  category_id    String?
  category       Categories?      @relation(fields: [category_id], references: [id], onDelete: SetNull, onUpdate: SetNull)
  created_at     DateTime         @default(now())
  specifications Specifications[]
  carsIamge      CarsImage[]
  Rentals        Rentals?

  @@map("cars")
}

model CarsImage {
  id         String   @id @default(uuid())
  car_id     String
  cars       Cars     @relation(fields: [car_id], references: [id], onDelete: SetNull, onUpdate: SetNull)
  imageName  String
  created_at DateTime @default(now())

  @@map("carsImages")
}

model Rentals {
  id                   String   @id @default(uuid())
  car_id               String   @unique
  cars                 Cars     @relation(fields: [car_id], references: [id], onDelete: SetNull, onUpdate: SetNull)
  user_id              String   @unique
  user                 Users    @relation(fields: [user_id], references: [id], onDelete: SetNull, onUpdate: SetNull)
  start_date           DateTime @default(now())
  end_date             DateTime?
  expected_return_date DateTime
  total                Float?
  created_at           DateTime @default(now())
  updated_at           DateTime @default(now())

  @@map("rentals")
}

// model SpecificationsCar {
//   car_id String 
//   car    Cars   @relation(fields: [car_id], references: [id], onDelete: SetNull, onUpdate: SetNull)

//   specification_id String 
//   specification    Specifications @relation(fields: [specification_id], references: [id], onDelete: SetNull, onUpdate: SetNull)

//   created_at DateTime @default(now())

//   @@id([car_id])
// }
