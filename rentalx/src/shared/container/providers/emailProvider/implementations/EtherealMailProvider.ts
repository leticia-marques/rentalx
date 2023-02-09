import { Transporter } from "nodemailer";
import { IEmailProvider } from "../IEmailProvider";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class EtherealMailProvider implements IEmailProvider
{
    private client:Transporter;
    constructor()
    {
        console.log("aqui");
        nodemailer.createTestAccount().then(account =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter;
        }).catch(error => console.log(error))
    }

    async sendEmail(to: string, subject: string, variables:any, path:string): Promise<void> 
    {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);

        const message = await this.client.sendMail({
            to, 
            from:"Rentx <noreplay@rentx.com.br>", 
            subject, 
            html:templateHtml})
        console.log("Message Sent:%s", message.messageId);
        console.log("Preview url:%s", nodemailer.getTestMessageUrl(message));
    }
}

export {EtherealMailProvider};