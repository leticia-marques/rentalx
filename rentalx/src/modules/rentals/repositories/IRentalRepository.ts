import { IRentalDTO } from "../DTOs/IRentalDTO";
import { Rental } from "../models/Rental";

interface IRentalsRepository
{
    findOpenRentalByCar(car_id:string):Promise<Rental>;
    findOpenRentalToUser(user_id:string):Promise<Rental>;
    create(data:IRentalDTO):Promise<Rental>;
    findById(rental_id:string):Promise<Rental>;
    update(rental_id:string, end_date:Date, total:number):Promise<Rental>
    findManyByUserId(user_id:string):Promise<Rental[]>;
}

export {IRentalsRepository};