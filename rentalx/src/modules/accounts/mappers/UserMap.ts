import { IResponseDTO } from "../dtos/IResponseDTO";
import { User } from "../models/User";
import {instanceToInstance} from "class-transformer";
class UserMapper
{
    static toDto({name, email, driver_license, id, avatar}:User):IResponseDTO
    {
        let avatar_url:string;
        if (process.env.disk === "local")
            avatar_url =  `${process.env.LOCAL_URL}/avatar/${avatar}`;
        else if (process.env.disk === "s3")
            avatar_url =  `${process.env.SERVER_URL}/avatar/${avatar}`;
            console.log("bobs")
        return {name, email, driver_license, id, avatar, avatar_url};
    }

}

export {UserMapper};