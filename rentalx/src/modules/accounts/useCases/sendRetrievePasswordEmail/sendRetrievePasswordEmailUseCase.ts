import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IEmailProvider } from "@shared/container/providers/emailProvider/IEmailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {v4 as uuidv4} from "uuid";
import {resolve} from "path";
@injectable()
class SendRetrievePasswordEmailUseCase
{
    constructor(
        @inject("UsersRepository") private usersRepository:IUsersRepository,
        @inject("DayjsDateProvider") private dateProvider:IDateProvider,
        @inject("UsersTokensRepository") private usersTokensRepository:IUserTokensRepository,
        @inject("EtherealMailProvider") private etherealMailProvider:IEmailProvider
        ){}

    async execute(email:string)
    {
        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new AppError("User not found");
        const token = uuidv4();
        const templatePath = resolve(__dirname, 
            "..", 
            "..", 
            "views", 
            "emails", 
            "forgotEmailView.hbs"
        );

        const variables = {
            name: user.name,
            link:`${process.env.RESET_PASSWORD_URL}${token}`
        }
        
        const expires_date = this.dateProvider.addHours(3);

        const response = await this.usersTokensRepository.create({expires_date, user_id:user.id, refresh_token:token});
        const message = await this.etherealMailProvider.sendEmail(email,
            "Recuperação de senha", 
            variables,
            templatePath
        );

    }
}

export {SendRetrievePasswordEmailUseCase};