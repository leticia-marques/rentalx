import { ICategoryDTO } from "@modules/cars/DTOs/ICategoryDTO";
import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository} from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository
{
    categories: Category[] = [];

    async create({ name, description }: ICategoryDTO): Promise<void> 
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

export {CategoriesRepositoryInMemory};