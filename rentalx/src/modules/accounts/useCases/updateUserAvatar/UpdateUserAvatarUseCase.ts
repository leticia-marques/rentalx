import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/deleteFile";
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
        if ( user.avatar)
        {
            await deleteFile(`./tmp/avatar/${avatarFile}`);
        }
        await this.userRepository.updateUser(userId, avatarFile);

    }
}

export {UpdateUserAvatarUseCase}