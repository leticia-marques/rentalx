
import { IUserDTO } from "@modules/accounts/dtos/iUserDTO";
import { User } from "@modules/accounts/models/User";
import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/IUsersRepository";


class UsersRepository implements IUsersRepository
{
    private users: PrismaClient;
    
    constructor()
    {
        this.users = new PrismaClient();
    }
    
    async create(data: IUserDTO): Promise<void> 
    {
        const user = await this.users.users.create({
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
                driver_license: data.driver_license,
                avatar: data.avatar,
                id: data.id
            }
        })
    }
    
    async  updateUserPassword(userId: string, password: any): Promise<User> 
    {
       const user = await this.users.users.update({
        where:{
           id:userId
        },
        data:{
            password:password
        }
       })

       return user;
    }
    async updateUserAvatar(userId: string, avatar?: string, password?:string): Promise<void>
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