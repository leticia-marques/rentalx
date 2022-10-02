import {Request, Response} from 'express';
import { CreateCategoriesUseCase } from './CreateCategoryUseCase';
import {container} from "tsyringe";

class CreateCategoryController
{
    async handle(request:Request, response:Response):Promise<Response>
    {
        const {name, description} =  request.body;
        const createCategoryUseCase = container.resolve(CreateCategoriesUseCase);
        await createCategoryUseCase.execute({name, description});
        return response.status(201).send();
    }
}

export {CreateCategoryController};