import { IRentalDTO } from "@modules/rentals/DTOs/IRentalDTO";
import { Rental } from "@modules/rentals/models/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { PrismaClient } from "@prisma/client";


class RentalsRepository implements IRentalsRepository
{
    private rentals:PrismaClient;

    constructor()
    {
        this.rentals = new PrismaClient();
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> 
    {
       const rental = await this.rentals.rentals.findFirst({where:{car_id:car_id}});
       return rental;
    }

    async findOpenRentalToUser(user_id: string): Promise<Rental> 
    {
        const rental = await this.rentals.rentals.findFirst({where:{user_id:user_id}})
        return rental;
    }

    async create(data: IRentalDTO): Promise<Rental> 
    {
        const rental = await this.rentals.rentals.create({
            data:{
            user_id:data.user_id,
            car_id:data.car_id,
            expected_return_date:data.expected_return_date,
            total:0,
            end_date: undefined
        }})
        return rental;
    }
    
}

export {RentalsRepository};