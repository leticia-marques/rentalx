import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayLoad
{
    sub: string;
}

export async function ensureAuthentication(request:Request, response: Response, next: NextFunction) 
{
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new AppError("Auth token not found or invalid");
    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = verify(token, auth.secret_token) as IPayLoad;
        
        request.user = {
            id: user_id
        }

        next();
    } catch (error) {
        throw new AppError("Token invalid");
    }
}