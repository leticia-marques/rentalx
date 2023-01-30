import { ICategoryDTO } from "../DTOs/ICatergoryDTO";
import { Category } from "../models/Categorie";


interface ICategoriesRespository
{
	create({name, description}:ICategoryDTO):Promise<void>;
	list():Promise<Category[]>;
	findByName(name:string):Promise<Category>;
}

export {ICategoriesRespository};
