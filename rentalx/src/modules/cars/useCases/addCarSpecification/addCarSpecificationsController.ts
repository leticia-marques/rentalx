import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddCarSpecificationUseCase } from "./addCarSpecificationUseCase";

class AddCarSpecificationsController
{
    async handle(request:Request, response:Response):Promise<Response>
    {
        const {id} = request.params;
        const {specifications} = request.body;
        const addCarSpecificationsUseCase = container.resolve(AddCarSpecificationUseCase);
        const car = await addCarSpecificationsUseCase.execute({car_id:id, specifications_id:specifications});

        return response.json(car);
    }
}


export {AddCarSpecificationsController}