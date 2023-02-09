import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { AddCarSpecificationUseCase } from "./addCarSpecificationUseCase";



let carsRepositoryInMemory:CarsRepositoryInMemory;
let addCarSpecificationUseCase: AddCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Add car specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory()
        addCarSpecificationUseCase = new AddCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
    })

    it ("should not be able to add specifications to a non-existent car", async () => {
        const car_id = "5151d";
        const specifications = ["5551"];
        await carsRepositoryInMemory.create({
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        })
        expect(async () => {
            await addCarSpecificationUseCase.execute(
                {car_id, specifications_id:specifications})
            }).rejects.toBeInstanceOf(AppError);
    })

    it ("should be able to add a specification to a car", async () => {
        const specification = await specificationRepositoryInMemory.create({name:"testeName", description:"TestDescription"});
        const specifications = [specification.id];
        const car = await carsRepositoryInMemory.create({
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        })
        const specificationsCars = await addCarSpecificationUseCase.execute({car_id:car.id, specifications_id:specifications});
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })
})