import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { PrismaClient } from "@prisma/client";



class CarsImagesRepository implements ICarsImagesRepository
{
    private carsImage:PrismaClient;

    constructor()
    {
        this.carsImage = new PrismaClient();
    }

    async create(car_id:string, image_name:string):Promise<void>
    {
        const carImage = this.carsImage.carsImage.create({
            data:{
                car_id:car_id,
                imageName:image_name
            }})
        console.log((await carImage).imageName);
    }
}

export {CarsImagesRepository};