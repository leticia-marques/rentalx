import {container} from "tsyringe";


import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { ICreateSpecification } from "@modules/cars/repositories/ISpecificationsRepository";
import { UsersRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/Prisma/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/Prisma/repositories/SpecificationRepository";

container.registerSingleton<ICategoriesRespository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ICreateSpecification>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
