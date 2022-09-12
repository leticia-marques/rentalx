import { Category } from "../../models/Categories";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";
import {Request, Response}  from "express";

class ListCategoriesController
{
    constructor(private listCategoriesUseCase:ListCategoriesUseCase){}

    handle(request:Request, response:Response):Response
    {
        const all = this.listCategoriesUseCase.execute();
        return response.json(all);
    }
}

export {ListCategoriesController};