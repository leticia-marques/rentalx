import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import {v4 as uuidv4} from "uuid";

async function create()
{
    const connection = new PrismaClient
    const id = uuidv4();
    const password = await hash("admin", 8);
    console.log(password)
    await connection.$queryRaw`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_licence)
                            values(${id}, 'admin', 'admin@rentx.com.br', ${password}, true, 'now()', 'xxx-xxx-xxx')`;
}

create().then(() => console.log("User Admin created"));