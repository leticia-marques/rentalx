import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../../dtos/iCreateUserDTO";
import { User } from "../../models/User";
import { IUsersRepository } from "../IUsersRespository";


class UsersRepository implements IUsersRepository
{
    private users: PrismaClient;
    
    constructor()
    {
        this.users = new PrismaClient();
    }

    async create(data: ICreateUserDTO): Promise<void> 
    {
        const user = await this.users.users.create({
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
                driver_licence: data.driver_licence
            }
        })
    }
    
    async findByEmail(email: string): Promise<User> 
    {
        const emailALreadyUsed = await this.users.users.findFirst({
            where:{
                email: email
            }
        })
        return emailALreadyUsed;
    }
    
}

export {UsersRepository}