import { ICreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { User } from "@modules/accounts/models/User";
import { IUsersRepository } from "../IUsersRespository";
import {v4 as uuidv4} from "uuid";

class UsersRepositoryInMemory implements IUsersRepository
{
    users: User[] = [];
    async create({name, email, driver_licence, password}: ICreateUserDTO): Promise<void> 
    {
        const user = new User();

        Object.assign(user, {
            name, 
            email, 
            driver_licence, 
            password,
            id: uuidv4()
        });
        this.users.push(user);
    }
    
    async findByEmail(email: string): Promise<User> 
    {
        const user = this.users.find(user => user.email == email);
        return user;
    }

    async findById(userId: string): Promise<User> 
    {
        return this.users.find(user => user.id === userId);
    }

    updateUser(userId: string, avatar: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export {UsersRepositoryInMemory}