import { IUserDTO } from "@modules/accounts/dtos/iUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateuserUseCase";


let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () =>{
    beforeEach(() =>{
        userRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        usersTokensRepositoryInMemory =  new  UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    })

    it("Should be able to authenticate user", async () => {
        const user : IUserDTO = {
            name: "Test Name",
            email: "Test@email.com",
            driver_license: "UUI15151",
            password: "123456789"
        };
        let password = user.password;
        await createUserUseCase.execute(user);
        const token = await authenticateUserUseCase.execute({
                email: user.email, 
                password: password
        });
        expect(token).toHaveProperty("token");
    })
})