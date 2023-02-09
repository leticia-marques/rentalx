import { CarsImages } from "@modules/cars/models/CarImages";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IUploadProvider } from "@shared/container/providers/uploadProvider/IUploadProvider";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    car_id:string;
    images_name:string[];
}

@injectable()

class AddCarsImagesUseCase
{
    constructor(
        @inject("CarsImagesRepository") private carsImagesRepository:ICarsImagesRepository,
        @inject("UploadProvider") private uploadProvider:IUploadProvider
        ){}

    async execute({car_id, images_name}:IRequest)
    {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image)
            await this.uploadProvider.save(image, "cars")
        })
    }
}

export {AddCarsImagesUseCase};