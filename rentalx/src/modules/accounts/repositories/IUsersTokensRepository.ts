import { IUserTokensDTO } from "../dtos/IUserTokensDTO";
import { UserTokens } from "../models/UserTokens";


interface IUserTokensRepository
{
    create({expires_date, user_id, refresh_token}:IUserTokensDTO):Promise<UserTokens>;
    findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<UserTokens>;
    deleteById(token_id:string):Promise<void>;
    findByRefreshToken(token:string):Promise<UserTokens>;
}

export {IUserTokensRepository};