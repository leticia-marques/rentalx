const  NodeEnvironment = require("jest-environment-node");
const {execSync} = require("child_process");

const prismaCLI = "./node_modules/.bin/prisma";
require("dotenv").config({
    path: resolve(__dirname, "..", ".env.test")
})

class CustomEnvironment extends NodeEnvironment
{
    constructor(config)
    {
        super(config);
        this.connectionString = process.env.DATABASE_URL_TEST;
    }
    
    setup()
    {
        this.global.process.env.DATABASE_URL = this.connectionString;
        execSync(`${prismaCLI} migrate dev`)
    }
}

module.exports = CustomEnvironment;