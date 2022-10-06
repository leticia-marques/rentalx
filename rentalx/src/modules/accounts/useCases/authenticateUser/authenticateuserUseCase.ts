import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
interface IRequest
{
    email: string;
    password: string;
}

interface IResponse
{
    user: {
        name: string;
        email: string;
    },
    token: string;

}

@injectable()
class AuthenticateUserUseCase
{
    constructor(@inject("UsersRepository") private userRepository: IUsersRepository){}

    async execute({email, password}:IRequest):Promise<IResponse>
    {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new AppError("Usuario ou senha incorretos");
        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect)
            throw new AppError("Usuario ou senha incorretos");
        const token = sign({}, "d7ed0c21147eda6d1e11cc7db5037c7b", {subject:user.id, expiresIn:"1d"});

        const authenticateToken : IResponse = {
            token, 
            user: {
                name: user.name,
                email: user.email
            }
        }
        return authenticateToken;
    }
}

export {AuthenticateUserUseCase}