import { ICreateCarsDTO } from "../DTOs/ICarsDTO";
import { Car } from "../models/Car";

interface ICarsRepository 
{
    create(data:ICreateCarsDTO):Promise<Car>;
    findCarByLicensePlate(license_plate:string):Promise<Car>;
    findAvaliable(name?:string, brand?:string, category_id?:string):Promise<Car[]>;
}

export{ICarsRepository}