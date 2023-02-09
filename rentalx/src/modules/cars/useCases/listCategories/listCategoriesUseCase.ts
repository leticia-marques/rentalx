import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase
{
    constructor(@inject("CategoriesRepository") private categoryRepository:ICategoriesRepository){}
    
    async execute():Promise<Category[]>
    {
        return await this.categoryRepository.list();
    }
}

export {ListCategoriesUseCase}