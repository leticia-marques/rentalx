import { Category } from "@modules/cars/models/Categories";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase
{
    constructor(@inject("CategoriesRepository") private categoryRepository:ICategoriesRespository){}
    async execute():Promise<Category[]>
    {
        return await this.categoryRepository.list();
    }
}

export {ListCategoriesUseCase}