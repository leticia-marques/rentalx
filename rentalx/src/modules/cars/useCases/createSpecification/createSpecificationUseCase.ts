import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    name:string;
    description:string;
}

@injectable()
class CreateSpecificationUseCase
{
    constructor(@inject("SpecificationsRepository") private specificationRespository:ISpecificationsRepository){}

    async execute({name, description}:IRequest):Promise<void>
    {
        const specificationAlreadyExists = await this.specificationRespository.findByName(name);
        if (specificationAlreadyExists)
            throw new AppError("Specification already exists");
        this.specificationRespository.create({name, description});
    }
}

export {CreateSpecificationUseCase};