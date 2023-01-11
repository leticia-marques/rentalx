import { CategoriesRepository } from "../../infra/Prisma/repositories/CategoriesRepository";
import { ImportCategoryController } from "./importCategoriesController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoryrepository = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoryrepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export {importCategoryController};