import { IUploadProvider } from "@shared/container/providers/uploadProvider/IUploadProvider";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/deleteFile";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest
{
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase
{   
    constructor(
        @inject("UsersRepository") private userRepository: IUsersRepository,
        @inject("UploadProvider") private uploadProvider:IUploadProvider){}

    async execute({userId, avatarFile}: IRequest):Promise<void>
    {
        const user = await this.userRepository.findById(userId);
        if ( user.avatar)
        {
            await this.uploadProvider.delete(user.avatar, "avatar");
        }
        await this.uploadProvider.save(avatarFile, "avatar");
        await this.userRepository.updateUserAvatar(userId, avatarFile);
    }
}

export {UpdateUserAvatarUseCase}