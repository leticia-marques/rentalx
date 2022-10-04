import {container} from "tsyringe";
import { ICategoriesRespository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ICreateSpecification } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRespository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ICreateSpecification>("SpecificationsRepository", SpecificationsRepository);