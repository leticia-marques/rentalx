import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendRetrievePasswordEmailUseCase } from "./sendRetrievePasswordEmailUseCase";

class SendRetrievePasswordEmailController
{
    async handle(request:Request, response:Response):Promise<Response>
    {
        const {email} = request.body;
        const sendRetrievePasswordEmailUseCase = container.resolve(SendRetrievePasswordEmailUseCase);
        await sendRetrievePasswordEmailUseCase.execute(email);


        return response.send();
    }
}

export {SendRetrievePasswordEmailController};