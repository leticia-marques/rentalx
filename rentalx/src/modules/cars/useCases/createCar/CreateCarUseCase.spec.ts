
import { ICarDTO } from "@modules/cars/DTOs/ICarDTO";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./createCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it ("should be able to create a new car", async () => {
        const car: ICarDTO = {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        }
        const car1 = await createCarUseCase.execute(car);
        expect(car1).toHaveProperty("id");
    })

    it ("Should not be able to create a new car with license plate that's already registered", () => {
        const car: ICarDTO = {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        }
        const car2: ICarDTO = {
            name: "Test name2",
            description: "Test Description2",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand2",
            category_id: "2"
        }
        expect(async () => {createCarUseCase.execute(car)});
        expect(async () => {createCarUseCase.execute(car2)}).rejects.toBeInstanceOf(AppError);
    })

    it ("it should create a car with availability true as default", async() => {
        const car: ICarDTO = {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        }

        const car1 = await createCarUseCase.execute(car);
        expect(car1.available).toBe(true);
    })
})