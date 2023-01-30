import { IUserDTO } from "../dtos/iUserDTO";
import { User } from "../models/User";

interface IUsersRepository
{
    create(data: IUserDTO):Promise<void>;
    findByEmail(email: string):Promise<User>;
    findById(userId: string):Promise<User>;
    updateUser(userId: string, avatar: string):Promise<void>
}

export {IUsersRepository}