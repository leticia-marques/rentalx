import { User } from "@modules/accounts/models/User";
import { IUsersRepository } from "../IUsersRepository";
import {v4 as uuidv4} from "uuid";
import { IUserDTO } from "@modules/accounts/dtos/iUserDTO";

class UsersRepositoryInMemory implements IUsersRepository
{
   
    users: User[] = [];
    async create({name, email, driver_license, password}: IUserDTO): Promise<void> 
    {
        const user = new User();

        Object.assign(user, {
            name, 
            email, 
            driver_license, 
            password,
            id: uuidv4()
        });
        this.users.push(user);
    }

    async updateUserAvatar(userId: string, avatar: string): Promise<void> 
    {
        const user = await this.findById(userId);
        user.avatar = avatar;
    }

    async updateUserPassword(userId: string, password: string): Promise<User> 
    {
       const user = await this.findById(userId);
       user.password = password;
       return user;
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

    async updateUser(userId: string, avatar: string): Promise<void> 
    {
       let user = await this.findById(userId);
       user.avatar = avatar;
    }
}

export {UsersRepositoryInMemory}