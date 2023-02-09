import { ICategoryDTO } from "../DTOs/ICategoryDTO";
import { Category } from "../models/Category";


interface ICategoriesRepository
{
	create({name, description}:ICategoryDTO):Promise<void>;
	list():Promise<Category[]>;
	findByName(name:string):Promise<Category>;
}

export {ICategoriesRepository};
