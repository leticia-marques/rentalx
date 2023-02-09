import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalUseCase } from "./listRentalUseCase";

class ListRentalController
{
    async handle(request:Request, response:Response):Promise<Response>
    {
        const {id} = request.user;
        const listRentalUseCase = container.resolve(ListRentalUseCase);
        const rentals =  await listRentalUseCase.execute(id);
        return response.status(200).json(rentals);
    }
}

export {ListRentalController}