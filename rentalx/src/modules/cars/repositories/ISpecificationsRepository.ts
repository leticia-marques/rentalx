import { Specification} from "../models/Specification";

interface ICreateSpecificationDTO
{
    name:string;
    description:string;
}

interface ICreateSpecification
{
    create({name, description}:ICreateSpecificationDTO):void;
    findByName(name:string):Specification;
}

export {ICreateSpecificationDTO, ICreateSpecification};