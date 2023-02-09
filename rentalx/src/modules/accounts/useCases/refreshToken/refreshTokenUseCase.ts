import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload
{
    sub: string;
    email:string;
}

interface ITokenResponse
{
    token:string;
    refresh_token:string;
}

@injectable()
class RefreshTokenUseCase
{
    constructor(@inject("UsersTokensRepository") private usersTokenRepository:IUserTokensRepository,
                @inject("DayjsDateProvider") private dateProvider:IDateProvider){}
    async execute(token:string):Promise<ITokenResponse>
    {
        const decode = verify(token, auth.refresh_secret_token) as IPayload;

        const user_id = decode.sub;
        const email = decode.email;
        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken)
            throw new AppError("Refresh Token not found");
        await this.usersTokenRepository.deleteById(userToken.id);
        const refreshTokenExpireDate = this.dateProvider.addDays(30);
        const refreshToken = sign({email}, auth.refresh_secret_token, {
            subject:user_id, 
            expiresIn:auth.expires_in_refresh_token
        });
        const newToken = sign({}, auth.secret_token, {subject:user_id, expiresIn:auth.expires_in_token});
        await this.usersTokenRepository.create({user_id, refresh_token:refreshToken, expires_date:refreshTokenExpireDate})
        return {token:newToken, refresh_token:refreshToken};
    }
}

export {RefreshTokenUseCase};