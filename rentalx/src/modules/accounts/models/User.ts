import {v4 as uuidv4} from "uuid";

class User
{
    id: string;
    name: string;
    // username: string;
    password: string;
    email: string;
    driver_licence: string;
    isAdmin: boolean;
}

export {User}