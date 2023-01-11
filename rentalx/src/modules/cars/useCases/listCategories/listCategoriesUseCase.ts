import { Category } from "@modules/cars/models/Categories";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";


class ListCategoriesUseCase
{
    constructor(private categoryRepostiroy:ICategoriesRespository){}

    execute():Promise<Category[]>
    {
        return this.categoryRepostiroy.list();
    }
}

export {ListCategoriesUseCase}