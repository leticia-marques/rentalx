import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoriesUseCase } from "./CreateCategoryUseCase";

const createCategoryRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoriesUseCase(createCategoryRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export {createCategoryController};