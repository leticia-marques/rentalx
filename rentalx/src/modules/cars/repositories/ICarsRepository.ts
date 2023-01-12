import { ICreateCarsDTO } from "../DTOs/ICarsDTO";

interface ICarsRepository 
{
    create(data:ICreateCarsDTO):Promise<void>;
}

export{ICarsRepository}