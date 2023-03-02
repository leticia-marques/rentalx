import { IResponseDTO } from "@modules/accounts/dtos/IResponseDTO";
import { UserMapper } from "@modules/accounts/mappers/UserMap";
import { User } from "@modules/accounts/models/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class UserProfileUseCase
{
    constructor(@inject("UsersRepository") private usersRepository:IUsersRepository){}

    async execute(id:string):Promise<IResponseDTO>
    {
        const user = await this.usersRepository.findById(id);
        
        return UserMapper.toDto(user);
    }
}

export {UserProfileUseCase};