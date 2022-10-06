import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICreateSpecification } from "../../repositories/ISpecificationsRepository";

interface IRequest
{
    name:string;
    description:string;
}
@injectable()
class CreateSpecificationUseCase
{
    constructor(@inject("SpecificationsRepository") private specificationRespository:ICreateSpecification){}

    async execute({name, description}:IRequest):Promise<void>
    {
        const specificationAlreadyExists = await this.specificationRespository.findByName(name);
        if (specificationAlreadyExists)
            throw new AppError("Specification already exists");
        this.specificationRespository.create({name, description});
    }
}

export {CreateSpecificationUseCase};