import {container} from "tsyringe";


import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { UsersRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/Prisma/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/Prisma/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/Prisma/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/Prisma/repositories/CarsImagesRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalsRepository } from "@modules/rentals/infra/Prisma/repositories/RentalsRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/Prisma/Repositories/UsersTokensRepository";
import { IDateProvider } from "./providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/dateProvider/implementations/DayjsDateProvider";
import { IEmailProvider } from "./providers/emailProvider/IEmailProvider";
import { IUploadProvider } from "./providers/uploadProvider/IUploadProvider";
import { EtherealMailProvider } from "./providers/emailProvider/implementations/EtherealMailProvider";
import { S3MailProvider } from "./providers/emailProvider/implementations/S3MailProvider";
import { S3UploadProvider } from "./providers/uploadProvider/implementations/S3UploadProvider";
import { UploadProvider } from "./providers/uploadProvider/implementations/UploadProvider";


const diskConfig = {
    local: UploadProvider,
    s3: S3UploadProvider
}

const mailConfig = {
    ethereal: container.resolve(EtherealMailProvider),
    nodeMailer: container.resolve(S3MailProvider)
}


container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImagesRepository>("CarsImagesRepository", CarsImagesRepository);
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);

container.registerSingleton<IUserTokensRepository>("UsersTokensRepository", UsersTokensRepository);
container.registerSingleton<IUserTokensRepository>("UsersTokensRepository", UsersTokensRepository);
container.registerInstance<IEmailProvider>("MailProvider", mailConfig[process.env.MAIL_PROVIDER]);
container.registerSingleton<IUploadProvider>("UploadProvider", diskConfig[process.env.disk]);
container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);