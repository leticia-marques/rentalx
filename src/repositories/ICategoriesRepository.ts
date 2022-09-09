import { Category } from "../models/Categories";

interface ICreateCategoryDTO
{
	name:string;
	description:string;
}

interface ICategoriesRespository
{
	create({name, description}:ICreateCategoryDTO):void;
	list():Category[];
	findByName(name:string):Category;
}

export {ICategoriesRespository, ICreateCategoryDTO};
