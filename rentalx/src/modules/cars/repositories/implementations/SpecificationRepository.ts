import { PrismaClient } from "@prisma/client";
import { Specification } from "../../models/Specification";
import { ICreateSpecification, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ICreateSpecification
{
    private specifications: PrismaClient;
    
    constructor()
    {
        this.specifications = new PrismaClient();
    }

    async create({ name, description }: ICreateSpecificationDTO):Promise<void>
    {
    //     const specification = new Specification();
    //     Object.assign(specification, {
    //         name,
    //         description,
    //         created_at: new Date()
    //     })
    //     this.specifications.push(specification);
            const  specification = await this.specifications.specifications.create({
                data:{
                    name: name,
                    description: description
                }
            })
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

}


export {SpecificationsRepository};