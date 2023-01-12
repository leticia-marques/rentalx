import { ICreateCarsDTO } from "@modules/cars/DTOs/ICarsDTO";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository
{
    cars: Car[] = [];
    async create(data: ICreateCarsDTO): Promise<void>
    {
        const car = new Car();
        Object.assign(car, { 
            name: data.name,
            description: data.description,
            daily_rate: data.daily_rate,
            license_plate: data.license_plate,
            fine_amount: data.fine_amount,
            brand: data.brand,
            category_id: data.category_id
        })
        this.cars.push(car);
    }
}

export{CarsRepositoryInMemory}