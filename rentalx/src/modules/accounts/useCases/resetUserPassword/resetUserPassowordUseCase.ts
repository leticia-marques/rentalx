import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    token:string;
    password:string;
}

@injectable()
class ResetUserPasswordUseCase
{
    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository:IUserTokensRepository,
        @inject("DayjsDateProvider") private dateProvider:IDateProvider,
        @inject("UsersRepository") private usersRepository:IUsersRepository
        ){}

    async execute({token, password}:IRequest):Promise<void>
    {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if (!userToken)
            throw new AppError("Token Invalid");
        if (this.dateProvider.checkIfExpired(userToken.expires_date, this.dateProvider.dateNow()))
            throw new AppError("Token expired");
        
        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await  hash(password, 8);
        await this.usersRepository.updateUserPassword(user.id, user.password);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}


export {ResetUserPasswordUseCase}