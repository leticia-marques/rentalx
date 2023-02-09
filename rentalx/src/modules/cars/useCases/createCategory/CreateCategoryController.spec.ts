import request from "supertest";
import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from "uuid";
import {app} from "@shared/infra/http/server";
import { hash } from "bcrypt";
import  {resolve} from "path";
import {execSync} from "child_process";
const prismaCli = "./node_modules/.bin/prisma";

require("dotenv").config({
    path: resolve(__dirname, "../../../../../", ".env.test")
})

describe("Create category controller", () => {
    beforeAll(async () => {
        const connection = new PrismaClient({datasources:{db:{url:process.env.DATABASE_URL}}});
        const id = uuidv4();
        const password = await hash("admin", 8);
        console.log(password)
        await connection.$queryRaw`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                            values(${id}, 'admin', 'admin@rentx.com.br', ${password}, true, 'now()', 'xxx-xxx-xxx')`;
    })
    afterAll(() => {
        execSync(`${prismaCli} migrate reset --force`)
    })
    it ("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/login").send({
            email:"admin@rentx.com.br",
            password:"admin"
        })
        const response = await request(app).post("/categories").send({
            name:"Category supertest",
            description: "Category supertest description"
        }).auth(responseToken.body.refresh_token, {type:"bearer"})
        expect(response.status).toBe(201);
    })

    it ("Should not be able to create a category that's been registered already", async () => {
        const responseToken = await request(app).post("/login").send({
            email:"admin@rentx.com.br",
            password:"admin"
        })
        const response = await request(app).post("/categories").send({
            name:"Category supertest",
            description: "Category supertest description"
        }).auth(responseToken.body.refresh_token, {type:"bearer"})
        console.log(responseToken.body);
        expect(response.status).toBe(400);
    })
})
