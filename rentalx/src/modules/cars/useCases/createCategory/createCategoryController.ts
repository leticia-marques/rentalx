import {Request, Response} from 'express';
import { CreateCategoriesUseCase } from './CreateCategoryUseCase';

class CreateCategoryController
{
    constructor(private createCategoryUseCase: CreateCategoriesUseCase){}

    handle(request:Request, response:Response):Response
    {
        const {name, description} =  request.body;
        this.createCategoryUseCase.execute({name, description});
        return response.status(201).send();
    }
}

export {CreateCategoryController};