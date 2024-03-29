import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { parse } from 'csv-parse';
import fs from "fs";
import { inject, injectable } from 'tsyringe';

interface IImportCategory
{
    name:string;
    description:string;
}

@injectable()
class ImportCategoriesUseCase
{
    constructor(@inject("CategoriesRepository") private categoryRepository: ICategoriesRepository) {}

    loadFile(file:Express.Multer.File):Promise<IImportCategory[]>
    {
       return new Promise((resolve, reject) => {
        const categories :IImportCategory[] = [];
        const stream = fs.createReadStream(file.path);

        const parseFile = parse();

        stream.pipe(parseFile);

        parseFile.on("data", async (line) => {
            const [name, description] = line;
            categories.push({name, description});
        }).on("end", () => {
            fs.promises.unlink(file.path);
            resolve(categories);
        }).on("error", (err)=>{
            reject(err);
        })
       });
    }

    async execute(file:Express.Multer.File):Promise<void>
    {
        const categories = await this.loadFile(file);
        categories.map(async category => {
            const {name, description} = category;
            const categoryExist = await this.categoryRepository.findByName(name);
            if (!categoryExist)
            {
                await this.categoryRepository.create({name, description});
            }
        });
    }
}

export {ImportCategoriesUseCase};