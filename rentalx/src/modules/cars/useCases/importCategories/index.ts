import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./importCategoriesController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoryrepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryrepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export {importCategoryController};