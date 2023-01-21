import { ICreateCarsDTO } from "@modules/cars/DTOs/ICarsDTO";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { PrismaClient } from "@prisma/client";

class CarsRepository implements ICarsRepository
{
    private cars: PrismaClient;

    constructor()
    {
       this.cars = new PrismaClient();
    }
    
    async create(data: ICreateCarsDTO): Promise<Car> 
    {
        const car = await this.cars.cars.create({
            data:{
                name: data.name,
                description: data.description,
                daily_rate: data.daily_rate,
                license_plate: data.license_plate,
                fine_amount: data.fine_amount,
                brand: data.brand,
                category_id: data.category_id,
            }
        })
        return car;
    }
    
    async findAvaliable(name?:string, brand?:string, category_id?:string): Promise<Car[]> 
    {
        let carsAvailable = await this.cars.cars.findMany({
            where:{
                available:true,
                name: name ? name : undefined,
                brand: brand ? brand : undefined,
                category_id: category_id ? category_id : undefined
            }
        });
        return carsAvailable
        
    }

    async findCarByLicensePlate(license_plate: string): Promise<Car> 
    {
       const car = await this.cars.cars.findFirst({where:{license_plate:license_plate}});
       return car;
    }
    
}

export{CarsRepository}