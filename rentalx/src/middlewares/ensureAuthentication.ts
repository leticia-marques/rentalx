import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthentication(request:Request, response: Response, nect: NextFunction) 
{
    const auth = request.headers.authorization;
    if (!auth)
        throw new Error("Auth token not found or invalid");
    const [, token] = auth.split(" ");
    try {
        const decoded = verify(token, "d7ed0c21147eda6d1e11cc7db5037c7b");
        console.log(decoded);
    } catch (error) {
        throw new Error("Token invalid");
    }
}