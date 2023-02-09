import { ICarDTO } from "@modules/cars/DTOs/ICarDTO";
import { Car } from "@modules/cars/models/Car";
import { Specification } from "@modules/cars/models/Specification";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository
{
    
    cars: Car[] = [];
    
    async create(data: ICarDTO): Promise<Car>
    {
        const car = new Car();
        Object.assign(car, { 
            name: data.name,
            description: data.description,
            daily_rate: data.daily_rate,
            license_plate: data.license_plate,
            fine_amount: data.fine_amount,
            brand: data.brand,
            category_id: data.category_id,
            specifications: data.specifications,
            id: data.id
        })
        
        this.cars.push(car);
        return car;
    }
    
    async update(car_id: string, specifications: Specification[]): Promise<Car> 
    {
        let car = await this.findById(car_id);
        car.specifications = specifications;
        
        return car;
    }

    async updateAvailable(car_id: string, available: boolean): Promise<Car> 
    {
        let car = await this.findById(car_id);
        console.log(car);
        car.available = available;
        return car;
    }
    
    async findById(car_id: string): Promise<Car> 
    {
        return this.cars.find(car => car.id === car_id);
    }
    
    async findCarByLicensePlate(license_plate: string): Promise<Car> 
    {
        return this.cars.find(car => car.license_plate === license_plate);    
    }
    
    async findAvailable(name?:string, brand?:string, category_id?:string): Promise<Car[]> 
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

export {CarsRepositoryInMemory}