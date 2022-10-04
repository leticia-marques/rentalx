
import {UsersRepository} from "../../repositories/implementations/UsersRepository"
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export default() => {
    const userRepository = new UsersRepository();
    const userUseCase  = new CreateUserUseCase(userRepository);
    const userController = new CreateUserController(userUseCase);

    return userController;
}