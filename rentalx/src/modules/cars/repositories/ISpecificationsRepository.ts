import { Specification} from "../models/Specification";

interface ICreateSpecificationDTO
{
    name:string;
    description:string;
}

interface ICreateSpecification
{
    create({name, description}:ICreateSpecificationDTO):Promise<void>;
    findByName(name:string):Promise<Specification>;
}

export {ICreateSpecificationDTO, ICreateSpecification};