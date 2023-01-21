import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListAvailableCarUseCase";

class ListAvailableCarsController
{
    async handle(request:Request, response:Response): Promise<Response>
    {
        const {brand, name, category_id} = request.query;
        const listAvailableCarsUseCase = container.resolve(ListCarsUseCase);
        const cars = await listAvailableCarsUseCase.execute({name: name as string, brand: brand as string, category_id: category_id as string});
        // console.log(cars);
        return response.json(cars);
    }
}


export {ListAvailableCarsController}