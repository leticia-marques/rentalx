import { ImportCategoryUseCase } from "./importCategoryUseCase";
import {Request, Response} from "express";
import { container } from "tsyringe";

class ImportCategoryController
{
    

    handle(request:Request, response:Response):Response
    {
        const importCategoriesUseCase = container.resolve(ImportCategoryUseCase);
        const {file}  = request;
        importCategoriesUseCase.execute(file);
        return response.status(201).send();
    }
}

export {ImportCategoryController};