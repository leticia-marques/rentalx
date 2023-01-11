import { ICategoriesRespository } from "../../../repositories/ICategoriesRepository";
import { PrismaClient} from "@prisma/client";
import { Category } from "@modules/cars/models/Categories";

interface ICreateCategoryDTO
{
	name:string;
	description:string;
}

class CategoriesRepository implements ICategoriesRespository
{
	private categories : PrismaClient;
	private static INSTANCE: CategoriesRepository;

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
		console.log(category);
	}

	async list(): Promise<Category[]>
	{
		const categories = await this.categories.categories.findMany();
		return categories;
	}

	async findByName(name:string):Promise<Category>
	{
		const categoryFound = await this.categories.categories.findFirst({
			where:{
				name: name
			}
		})
		return categoryFound;
	}
}

export {CategoriesRepository};
