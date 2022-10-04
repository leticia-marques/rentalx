import { ICreateUserDTO } from "../../dtos/iCreateUserDTO";

interface IUsersRepository
{
    create(data: ICreateUserDTO):Promise<void>;
}

export {IUsersRepository}