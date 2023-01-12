import { Category } from "../models/Categorie";
import { ICategoriesRespository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoryRepository implements ICategoriesRespository
{
	list(): Category[] {
		return null;
	}

	create({ name, description }: ICreateCategoryDTO): void {
		console.log(name, description);
	}

	findByName(name: string): Category {
		return null;
	}
}

export {PostgresCategoryRepository};
