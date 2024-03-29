import {Request, Response} from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import {container} from "tsyringe";

class CreateUserController
{
    async handle(request: Request, response:Response):Promise<Response>
    {
       const {name, driver_license, email, password} = request.body;
       const createUserUserCase = container.resolve(CreateUserUseCase);
       await createUserUserCase.execute({
        name: name,
        password: password,
        driver_license: driver_license,
        email: email
        });
       return response.status(201).send();
    }
}

export {CreateUserController}