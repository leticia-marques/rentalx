import { IEmailProvider } from "../IEmailProvider";


class MailProviderInMemory implements IEmailProvider
{
    private message: any[] = [];
    async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> 
    {
        this.message.push({to, subject, variables, path});
    }
    
}

export {MailProviderInMemory};