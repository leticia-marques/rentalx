import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { PrismaClient} from "@prisma/client";
import { Category } from "@modules/cars/models/Category";

interface ICreateCategoryDTO
{
	name:string;
	description:string;
}

class CategoriesRepository implements ICategoriesRepository
{
	private categories : PrismaClient;

	constructor()
	{
		this.categories = new PrismaClient();
	}

	async create({name, description}: ICreateCategoryDTO):Promise<void>
	{
		const category = await this.categories.categories.create({
			data:{
				name: name,
				description: description
			}
		})
	}

	async list(): Promise<Category[]>
	{
		const categories = await this.categories.categories.findMany();
		return categories;
	}
	
	async findByName(name:string):Promise<Category>
	{
		const category = await this.categories.categories.findFirst({
			where:{
				name: name
			}
		})
		return category;
	}
}

export {CategoriesRepository};
