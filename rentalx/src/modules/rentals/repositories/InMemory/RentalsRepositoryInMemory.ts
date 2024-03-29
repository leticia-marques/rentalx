import { IRentalDTO } from "@modules/rentals/DTOs/IRentalDTO";
import { Rental } from "@modules/rentals/models/Rental";
import { IRentalsRepository } from "../IRentalRepository";


class RentalsRepositoryInMemory implements IRentalsRepository
{
    
    rentals: Rental[] = [];
    async create(data: IRentalDTO): Promise<Rental> 
    {
        const rental = new Rental();
        Object.assign(rental, {
            car_id:data.car_id, 
            user_id:data.user_id, 
            expected_return_date:data.expected_return_date, 
            start_date:new Date()
        })
        this.rentals.push(rental);
        return rental;
    }

    async findById(rental_id: string): Promise<Rental> 
    {
        return this.rentals.find(rental => rental.id === rental_id);
    }

    async update(rental_id: string, end_date: Date, total: number): Promise<Rental> 
    {
        const rental = await this.findById(rental_id);
        rental.end_date = end_date;
        rental.total = total;

        return rental
    }

    async findManyByUserId(user_id: string): Promise<Rental[]> 
    {
        return this.rentals.filter(rental => rental.user_id === user_id);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> 
    {
        return this.rentals.find(rental => rental.id === car_id && !rental.end_date)
    }

    async findOpenRentalToUser(user_id: string): Promise<Rental>
    {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }
    
}

export {RentalsRepositoryInMemory};