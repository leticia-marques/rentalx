import { ISpecificationDTO } from "../DTOs/ISpecificationDTO";
import { Specification} from "../models/Specification";

interface ISpecificationsRepository
{
    create({name, description}:ISpecificationDTO):Promise<Specification>;
    findByName(name:string):Promise<Specification>;
    findByIds(ids:string[]):Promise<Specification[]>;
}

export {ISpecificationsRepository};