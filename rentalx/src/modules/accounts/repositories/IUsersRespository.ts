import { ICreateUserDTO } from "../../dtos/iCreateUserDTO";
import { User } from "../models/User";

interface IUsersRepository
{
    create(data: ICreateUserDTO):Promise<void>;
    findByEmail(email: string):Promise<User>;
}

export {IUsersRepository}