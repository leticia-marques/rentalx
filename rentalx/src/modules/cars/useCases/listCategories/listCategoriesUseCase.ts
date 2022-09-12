import { Category } from "../../models/Categories";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase
{
    constructor(private categoryRepostiroy:ICategoriesRespository){}

    execute():Category[]
    {
        return this.categoryRepostiroy.list();
    }
}

export {ListCategoriesUseCase}