import { PrismaClient } from "@prisma/client";
import { Specification } from "@modules/cars/models/Specification";
import {ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import { ISpecificationDTO } from "@modules/cars/DTOs/ISpecificationDTO";

class SpecificationsRepository implements ISpecificationsRepository
{
    private specifications: PrismaClient;
    
    constructor()
    {
        this.specifications = new PrismaClient();
    }
   

    async create({ name, description }: ISpecificationDTO):Promise<Specification>
    {
       const  specification = await this.specifications.specifications.create({
            data:{
                   name: name,
                    description: description
                }
            })
        return specification
    }

    async findByName(name: string): Promise<Specification> 
    {
        const specification = await this.specifications.specifications.findFirst({
            where:{
                name: name
            }
        });
        return specification;    
    }

    async findByIds(ids: string[]): Promise<Specification[]> 
    {
        const specifications = await this.specifications.specifications.findMany({where:{id:{in:ids}}})
        return specifications;
    }

}


export {SpecificationsRepository};