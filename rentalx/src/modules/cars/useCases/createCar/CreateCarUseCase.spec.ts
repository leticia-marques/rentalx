import { ICreateCarsDTO } from "@modules/cars/DTOs/ICarsDTO";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarsUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it ("should be able to create a new car", async () => {
        const car: ICreateCarsDTO = {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        }
        await createCarUseCase.execute(car);
    })
})