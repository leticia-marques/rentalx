import { Category } from "../models/Categories";
import { ICategoriesRespository } from "./ICategoriesRepository";

interface ICreateCategoryDTO
{
	name:string;
	description:string;
}

class CategoriesRepository implements ICategoriesRespository
{
	private categories : Category[];

	constructor()
	{
		this.categories = [];
	}

	create({name, description}: ICreateCategoryDTO):void
	{
		const category = new Category();
		Object.assign(category, {
			name,
			description,
			created_at : new Date()
		})
		this.categories.push(category);
		console.log(this.categories);
	}

	list(): Category[]
	{
		return this.categories;
	}

	findByName(name:string):Category
	{
		const categoryFound = this.categories.find(category => category.name === name)
		return categoryFound;
	}
}

export {CategoriesRepository};
