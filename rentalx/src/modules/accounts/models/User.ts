import {v4 as uuidv4} from "uuid";

class User
{
    id: string;
    name: string;
    password: string;
    avatar: string;
    email: string;
    driver_license: string;
    isAdmin: boolean;

    constructor()
    {
        if (!this.id)
        {
            this.id = uuidv4();
            this.isAdmin = false
        }
    }
}

export {User}