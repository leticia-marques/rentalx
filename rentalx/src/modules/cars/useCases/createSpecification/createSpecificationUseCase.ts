import { ICreateSpecification } from "../../repositories/ISpecificationsRepository";

interface IRequest
{
    name:string;
    description:string;
}

class CreateSpecificationUseCase
{
    constructor(private specificationRespository:ICreateSpecification){}

    execute({name, description}:IRequest):void
    {
        const specificationAlreadyExists = this.specificationRespository.findByName(name);
        if (specificationAlreadyExists)
            throw new Error("Specification already exists");
        this.specificationRespository.create({name, description});
    }
}

export {CreateSpecificationUseCase};