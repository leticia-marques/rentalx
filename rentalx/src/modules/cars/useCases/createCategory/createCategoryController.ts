import {Request, Response} from 'express';
import { CreateCategoriesUseCase } from './CreateCategoryUseCase';

class CreateCategoryController
{
    constructor(private createCategoryUseCase: CreateCategoriesUseCase){}

    async handle(request:Request, response:Response):Promise<Response>
    {
        const {name, description} =  request.body;
        await this.createCategoryUseCase.execute({name, description});
        return response.status(201).send();
    }
}

export {CreateCategoryController};