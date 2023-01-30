import { container } from "tsyringe";
import { AddCarsImagesUseCase} from "./addCarImagesUseCase";
import { Request, Response } from "express";


interface IFiles
{
    filename:string;
}

class AddCarImagesController
{
    async handle(request:Request, response:Response):Promise<Response>
    {
        const {id} = request.params;
        const images = request.files as IFiles[];
        const fileNames = images.map((file) => file.filename);
        const addCarsImagesUseCase = container.resolve(AddCarsImagesUseCase);
        await addCarsImagesUseCase.execute({car_id:id, images_name:fileNames});

        return response.status(201).send();
    }
}

export {AddCarImagesController};