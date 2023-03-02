// import { container } from "tsyringe";
// import { IDateProvider } from "./dateProvider/IDateProvider";
// import { DayjsDateProvider } from "./dateProvider/implementations/DayjsDateProvider";
// import { IEmailProvider } from "./emailProvider/IEmailProvider";
// import { EtherealMailProvider } from "./emailProvider/implementations/EtherealMailProvider";
// import { NodeMailerMailProvider } from "./emailProvider/implementations/NodeMailer";
// import { S3UploadProvider } from "./uploadProvider/implementations/S3UploadProvider";
// import { UploadProvider } from "./uploadProvider/implementations/UploadProvider";
// import { IUploadProvider } from "./uploadProvider/IUploadProvider";

// const diskConfig = {
//     local: UploadProvider,
//     s3: S3UploadProvider
// }

// const mailConfig = {
//     ethereal: container.resolve(EtherealMailProvider),
//     nodeMailer: container.resolve(NodeMailerMailProvider)
// }

// container.registerInstance<IEmailProvider>("MailProvider", mailConfig[process.env.MAIL_PROVIDER]);
// container.registerSingleton<IUploadProvider>("UploadProvider", diskConfig[process.env.disk]);
// container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);