import { Category } from "@modules/cars/models/Categories";
import { ICategoriesRespository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CreateCategoryRepositoryInMemory implements ICategoriesRespository
{
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> 
    {
        const category = new Category();
        Object.assign(category, {name, description});

        this.categories.push(category);
    }

    async list(): Promise<Category[]> 
    {
        const all = this.categories;

        return all;
    }

    async findByName(name: string): Promise<Category> 
    {
        const category = this.categories.find(category => category.name === name);

        return category;
    }
    
}

export {CreateCategoryRepositoryInMemory};