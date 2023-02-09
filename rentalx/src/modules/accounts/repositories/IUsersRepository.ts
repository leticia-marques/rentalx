import { IUserDTO } from "../dtos/iUserDTO";
import { User } from "../models/User";

interface IUsersRepository
{
    create(data: IUserDTO):Promise<void>;
    findByEmail(email: string):Promise<User>;
    findById(userId: string):Promise<User>;
    updateUserAvatar(userId: string, avatar: string):Promise<void>;
    updateUserPassword(userId:string, password:string):Promise<User>;
}

export {IUsersRepository}