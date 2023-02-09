import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
    beforeEach(()=> {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it('Should be able to create a new category', async () =>{
        const category = {
            name : "Category test name",
            description : "Category test description"
        }

        await  createCategoryUseCase.execute({name:category.name, description:category.description});
        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    })

    it('Should be able to create existent category', async () =>{
       
       expect(async ()=>{
        const category = {
            name : "Category test name",
            description : "Category test description"
        }

        await  createCategoryUseCase.execute({name:category.name, description:category.description});
        await  createCategoryUseCase.execute({name:category.name, description:category.description});
       }).rejects.toBeInstanceOf(AppError);
    })
})