import { IUserTokensDTO } from "@modules/accounts/dtos/IUserTokensDTO";
import { UserTokens } from "@modules/accounts/models/UserTokens";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PrismaClient } from "@prisma/client";


class UsersTokensRepository implements IUserTokensRepository
{
    private usersTokens:PrismaClient;

    constructor()
    {
        this.usersTokens = new PrismaClient();
    }
          
    async create({ expires_date, user_id, refresh_token }: IUserTokensDTO): Promise<UserTokens> 
    {
        const userToken = this.usersTokens.userTokens.create({data:{
            user_id:user_id,
            expires_date:expires_date,
            refresh_token:refresh_token
        }});
        
        return userToken;
    }
    
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> 
    {
        const refreshToken = await this.usersTokens.userTokens.findFirst({
            where:{
                user_id:user_id,
                refresh_token:refresh_token
            }
        })
        
        return refreshToken;
    }

    async deleteById(token_id: string): Promise<void> 
    {
        await this.usersTokens.userTokens.delete({where:{id:token_id}});
    }

    async findByRefreshToken(token: string): Promise<UserTokens> 
    {
        const userToken = await this.usersTokens.userTokens.findFirst({
            where:{
                refresh_token:token
            }
        })

        return userToken;
    }
}

export {UsersTokensRepository}