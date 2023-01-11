import { ICreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { User } from "@modules/accounts/models/User";
import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/IUsersRespository";


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
                driver_licence: data.driver_licence,
                avatar: data.avatar,
                id: data.id
            }
        })
    }
    
    async updateUser(userId: string, avatar: string): Promise<void>
    {
        await this.users.users.update({
            where:{
                id: userId
            },
            data:{
                avatar: avatar
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

    async findById(userId: string): Promise<User> 
    {
        const user = await this.users.users.findFirst({
            where:{
                id: userId
            }
        })    
        return user;
    }
    
}

export {UsersRepository}