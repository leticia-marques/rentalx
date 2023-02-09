import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase
{
    constructor(@inject("CarsRepository") private carsRepository:ICarsRepository){}

    async execute({name, description, daily_rate, license_plate, fine_amount, brand, category_id}:IRequest):Promise<Car>
    {
        const alreadyExistsCar = await this.carsRepository.findCarByLicensePlate(license_plate);
        if (alreadyExistsCar)
            throw new AppError("License plate already registered");
        const car = await this.carsRepository.create({name, description, daily_rate, license_plate, fine_amount, brand, category_id});
        return car;
    }
}

export{CreateCarUseCase}