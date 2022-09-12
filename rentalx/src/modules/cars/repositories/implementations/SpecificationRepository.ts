import { Specification } from "../../models/Specification";
import { ICreateSpecification, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ICreateSpecification
{
    private specifications: Specification[];
    
    constructor()
    {
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO) 
    {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        })
        this.specifications.push(specification);
    }

    findByName(name: string): Specification 
    {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;    
    }

}


export {SpecificationsRepository};