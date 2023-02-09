import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/emailProvider/inMemory/mailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendRetrievePasswordEmailUseCase } from "./sendRetrievePasswordEmailUseCase"

let sendRetrieveEmailPasswordUseCase: SendRetrievePasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
describe("send reset email", () =>{
    beforeAll(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        sendRetrieveEmailPasswordUseCase = new SendRetrievePasswordEmailUseCase(
            usersRepositoryInMemory, 
            dateProvider, 
            usersTokensRepositoryInMemory,
            mailProviderInMemory
        );
    });

    it ("should be able to send a retrieve password email", async () => {
        const sendEmail = jest.spyOn(mailProviderInMemory, "sendEmail");

        await usersRepositoryInMemory.create({
            driver_license:"5555",
            name:"test name",
            email:"testemail@email.com.br",
            password:"asasasas"
        });

        await sendRetrieveEmailPasswordUseCase.execute("testemail@email.com.br");
        expect(sendEmail).toHaveBeenCalled();
    })

    it ("should not be able to send a retrieve password email if user doesn't exist", async() => {
        await expect(sendRetrieveEmailPasswordUseCase.execute("blops@email.com"))
                .rejects.toEqual(new AppError("User not found"))
    })

    it ("should be able to create an user token", async () => {
        const response = jest.spyOn(usersTokensRepositoryInMemory, "create");
        await usersRepositoryInMemory.create({
            driver_license:"5555",
            name:"test name",
            email:"testemail@email.com.br",
            password:"asasasas"
        });

        await sendRetrieveEmailPasswordUseCase.execute("testemail@email.com.br");
        expect(response).toHaveBeenCalled();
    })
})