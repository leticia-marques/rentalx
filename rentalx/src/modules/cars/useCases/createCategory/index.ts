import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoriesUseCase } from "./CreateCategoryUseCase";

export default() => {

    const createCategoryRepository = new CategoriesRepository();
    
    const createCategoryUseCase = new CreateCategoriesUseCase(createCategoryRepository);
    
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);
    return createCategoryController;
}
