import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

interface IRequest
{
    email: string;
    password: string;
}

interface IResponse
{
    user: {
        name: string;
        email: string;
    },
    token: string;
    refresh_token:string;
}

@injectable()
class AuthenticateUserUseCase
{
    constructor(
                @inject("UsersRepository") private userRepository: IUsersRepository, 
                @inject("UsersTokensRepository") private usersTokensRepository:IUserTokensRepository,
                @inject("DayjsDateProvider") private dateProvider:IDateProvider){}

    async execute({email, password}:IRequest):Promise<IResponse>
    {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new AppError("Usuario ou senha incorretos");
        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect)
            throw new AppError("Usuario ou senha incorretos");
        const token = sign({}, auth.secret_token, {subject:user.id, expiresIn:auth.expires_in_token});
        const refreshToken = sign({email}, auth.refresh_secret_token, {subject:user.id, expiresIn:auth.expires_in_refresh_token});
        const refreshTokenExpireDate = this.dateProvider.addDays(30);
        await this.usersTokensRepository.create({user_id:user.id, refresh_token:refreshToken, expires_date:refreshTokenExpireDate})
        const authenticateToken : IResponse = {
            token, 
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token:refreshToken
        }
        return authenticateToken;
    }
}

export {AuthenticateUserUseCase};