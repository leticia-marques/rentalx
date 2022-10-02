import { inject, injectable } from "tsyringe";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IRequest
{
	name:string;
	description:string;
}
@injectable()
class CreateCategoriesUseCase
{
	constructor(@inject("CategoriesRepository") private categoryRepository:ICategoriesRespository){}

	async execute({name, description}:IRequest):Promise<void>
	{
		const categoryAlreadyExists = await this.categoryRepository.findByName(name);
		if (categoryAlreadyExists)
			throw new Error("Category already exists");
		this.categoryRepository.create({name, description});
	}
}

export {CreateCategoriesUseCase}
