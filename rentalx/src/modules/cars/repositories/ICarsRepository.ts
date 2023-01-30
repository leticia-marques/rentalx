import { ICarDTO } from "../DTOs/ICarDTO";
import { Car } from "../models/Car";
import { Specification } from "../models/Specification";

interface ICarsRepository 
{
    create(data:ICarDTO):Promise<Car>;
    findCarByLicensePlate(license_plate:string):Promise<Car>;
    findAvaliable(name?:string, brand?:string, category_id?:string):Promise<Car[]>;
    findById(car_id:string):Promise<Car>;
    update(car_id:string, specifications:Specification[]):Promise<Car>
}

export {ICarsRepository}