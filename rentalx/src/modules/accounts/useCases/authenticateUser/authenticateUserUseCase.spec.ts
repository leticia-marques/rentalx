import { ICreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateuserUseCase";


let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user", () =>{
    beforeEach(() =>{
        userRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    })

    it("Should be able to authenticate user", async () => {
        const user : ICreateUserDTO = {
            name: "Test Name",
            email: "Test@email.com",
            driver_licence: "UUI15151",
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