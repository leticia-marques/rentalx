import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRespository";

interface IRequest
{
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase
{   
    constructor(@inject("UsersRepository") private userRepository: IUsersRepository){}

    async execute({userId, avatarFile}: IRequest):Promise<void>
    {
        const user = await this.userRepository.findById(userId);

        user.avatar = avatarFile;

        await this.userRepository.create(user);
    }
}

export {UpdateUserAvatarUseCase}