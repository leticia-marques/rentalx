import { parse } from 'csv-parse';
import fs from "fs";
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory
{
    name:string;
    description:string;
}

class ImportCategoryUseCase
{
    constructor(private categoryrepository: CategoriesRepository) {}

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
            const categoryExist = this.categoryrepository.findByName(name);
            if (!categoryExist)
            {
                this.categoryrepository.create({name, description});
            }
        });
    }
}

export {ImportCategoryUseCase};