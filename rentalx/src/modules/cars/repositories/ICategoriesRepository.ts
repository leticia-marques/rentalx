import { Category } from "../models/Categories";

interface ICreateCategoryDTO
{
	name:string;
	description:string;
}

interface ICategoriesRespository
{
	create({name, description}:ICreateCategoryDTO):Promise<void>;
	list():Promise<Category[]>;
	findByName(name:string):Promise<Category>;
}

export {ICategoriesRespository, ICreateCategoryDTO};
