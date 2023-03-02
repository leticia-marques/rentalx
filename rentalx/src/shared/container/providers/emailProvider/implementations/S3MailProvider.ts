import { getPrismaClient } from "@prisma/client/runtime";
import nodemailer, {Transporter} from "nodemailer";
import { IEmailProvider } from "../IEmailProvider";
import fs from "fs";
import handlebars from "handlebars";
import { injectable } from "tsyringe";
import { SES } from "aws-sdk";

@injectable()
class S3MailProvider implements IEmailProvider
{
    client: Transporter;
    constructor()
    {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion:"2010-12-01",
                region:process.env.EMAIL_REGION
            })
        })
    }
    
    async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> 
    {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);

        await this.client.sendMail({
            from: `Rentx ${process.env.EMAIL_FROM}`,
            to,
            subject,
            html:templateHtml
        })
    }
    
}

export {S3MailProvider};