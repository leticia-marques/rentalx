import { ICreateCarsDTO } from "@modules/cars/DTOs/ICarsDTO";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository
{
    cars: Car[] = [];
    async create(data: ICreateCarsDTO): Promise<Car>
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
        return car;
    }

    async findCarByLicensePlate(license_plate: string): Promise<Car> 
    {
        return this.cars.find(car => car.license_plate === license_plate);    
    }

    async findAvaliable(name?:string, brand?:string, category_id?:string): Promise<Car[]> 
    {
        const cars = this.cars.filter(car => {
            if (car.available == true)
            {
                if ((name && car.name === name) || (brand && car.brand === brand)|| (category_id && car.category_id === category_id) )
                    return car
            }
            return null;
        });    
        return cars;
    }
}

export{CarsRepositoryInMemory}