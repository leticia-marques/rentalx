import { AppError } from "@shared/errors/AppError";
import { CreateCategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoriesUseCase } from "./CreateCategoryUseCase";

let categoriesRepostiroyinMemory: CreateCategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoriesUseCase;

describe("Create Category", () => {
    beforeEach(()=> {
        categoriesRepostiroyinMemory = new CreateCategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoriesUseCase(categoriesRepostiroyinMemory);
    });

    it('Should be able to create a new category', async () =>{
        const category = {
            name : "Category test name",
            description : "Category test description"
        }

        await  createCategoryUseCase.execute({name:category.name, description:category.description});
        const categoryCreated = await categoriesRepostiroyinMemory.findByName(category.name);
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