import { IUserTokensDTO } from "@modules/accounts/dtos/IUserTokensDTO";
import { UserTokens } from "@modules/accounts/models/UserTokens";
import { IUserTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUserTokensRepository
{
    userTokens: UserTokens[] = [];

    async create({ expires_date, user_id, refresh_token }: IUserTokensDTO): Promise<UserTokens> 
    {
        const userToken  = new UserTokens();

        Object.assign(userToken, {expires_date, refresh_token, user_id});
        this.userTokens.push(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> 
    {
        const userToken = this.userTokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
        return userToken;
    }

    async deleteById(token_id: string): Promise<void> 
    {
        const newUserTokens = this.userTokens.filter(token => token.id != token_id);
        this.userTokens = newUserTokens;
    }

    async findByRefreshToken(token: string): Promise<UserTokens> 
    {
        const userToken = this.userTokens.find(tk => tk.refresh_token === token);
        return userToken;
    }
    
}

export {UsersTokensRepositoryInMemory}

