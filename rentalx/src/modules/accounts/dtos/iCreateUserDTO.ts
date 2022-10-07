interface ICreateUserDTO
{   
    name: string;
    // username: string;
    email: string;
    password: string;
    avatar?: string;
    id?: string;
    driver_licence: string
}

export {ICreateUserDTO}