import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRespository";

interface IRequest
{
    name: string;
    email: string;
    username: string;
    password: string;
    driver_licence: string;
}
@injectable()
class CreateUserUseCase
{
    constructor(@inject("UsersRepository") private userRepository: IUsersRepository){}

    async execute(data: IRequest):Promise<void>
    {
        this.userRepository.create(data);
    }
}

export {CreateUserUseCase}