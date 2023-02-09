import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    name?:string;
    brand?:string;
    category_id?:string;
}
@injectable()
class ListCarsUseCase
{
    constructor(@inject("CarsRepository") private carRepository:ICarsRepository){}

    async execute({name, brand, category_id}:IRequest):Promise<Car[]>
    {
        const cars = await this.carRepository.findAvailable(name, brand, category_id);
        return cars;
    }
}

export{ListCarsUseCase}