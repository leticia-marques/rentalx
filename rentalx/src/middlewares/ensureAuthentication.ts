import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad
{
    sub: string;
}

export async function ensureAuthentication(request:Request, response: Response, next: NextFunction) 
{
    const auth = request.headers.authorization;
    if (!auth)
        throw new AppError("Auth token not found or invalid");
    const [, token] = auth.split(" ");
    try {
        const {sub: user_id} = verify(token, "d7ed0c21147eda6d1e11cc7db5037c7b") as IPayLoad;

        const userRepository = new UsersRepository();

        const user = userRepository.findById(user_id);

        if (!user)
            throw new AppError("User not found");
        
        request.user = {
            id: user_id
        }

        next();
    } catch (error) {
        throw new AppError("Token invalid");
    }
}