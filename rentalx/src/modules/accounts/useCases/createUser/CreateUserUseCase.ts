import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRespository";

interface IRequest
{
    name: string;
    email: string;
    password: string;
    driver_licence: string;
}
@injectable()
class CreateUserUseCase
{
    constructor(@inject("UsersRepository") private userRepository: IUsersRepository){}

    async execute(data: IRequest):Promise<void>
    {
        const emailALreadyUsed = await this.userRepository.findByEmail(data.email);
        
        if (emailALreadyUsed)
        {
            throw new Error("Email já está no banco de dados");
        }
        const passwordHash = await hash(data.password, 8);
        data.password = passwordHash;
        await this.userRepository.create(data);
    }
}

export {CreateUserUseCase}