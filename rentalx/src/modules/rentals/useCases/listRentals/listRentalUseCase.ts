import { Rental } from "@modules/rentals/models/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalUseCase
{
    constructor(@inject("RentalsRepository") private rentalsRepository:IRentalsRepository){}

    async execute(user_id:string):Promise<Rental[]>
    {
        const rental = this.rentalsRepository.findManyByUserId(user_id);

        return rental;
    }
}


export {ListRentalUseCase}