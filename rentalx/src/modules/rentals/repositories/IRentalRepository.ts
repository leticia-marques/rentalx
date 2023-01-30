import { IRentalDTO } from "../DTOs/IRentalDTO";
import { Rental } from "../models/Rental";

interface IRentalsRepository
{
    findOpenRentalByCar(car_id:string):Promise<Rental>;
    findOpenRentalToUser(user_id:string):Promise<Rental>;
    create(data:IRentalDTO):Promise<Rental>;
}

export {IRentalsRepository};