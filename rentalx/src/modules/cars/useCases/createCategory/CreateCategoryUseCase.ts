import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IRequest
{
	name:string;
	description:string;
}

class CreateCategoriesUseCase
{
	constructor(private categoryRepository:ICategoriesRespository){}

	execute({name, description}:IRequest):void
	{
		const categoryAlreadyExists = this.categoryRepository.findByName(name);
		if (categoryAlreadyExists)
			throw new Error("Category already exists");
		this.categoryRepository.create({name, description});
	}
}

export {CreateCategoriesUseCase}