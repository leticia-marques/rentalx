import {container} from "tsyringe";


import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { UsersRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/Prisma/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/Prisma/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/Prisma/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/Prisma/repositories/CarsImagesRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalsRepository } from "@modules/rentals/infra/Prisma/repositories/RentalsRepository";
import { IDateProvider } from "./providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/dateProvider/implementations/DayjsDateProvider";

container.registerSingleton<ICategoriesRespository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImagesRepository>("CarsImagesRepository", CarsImagesRepository);
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);
container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);