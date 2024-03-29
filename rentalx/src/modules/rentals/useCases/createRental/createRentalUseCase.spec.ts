import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./createRentalUseCase"
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { cars } from "@shared/infra/http/routes/cars.routes";
import { ICarDTO } from "@modules/cars/DTOs/ICarDTO";

let createRentalUseCase:CreateRentalUseCase;
let rentalsRepositoryInMemory:RentalsRepositoryInMemory;
let dayjsDateProvider:DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    })

    it ("Should be able to create a rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        });
        const rental = await createRentalUseCase.execute({user_id:"123456", car_id:car.id, expected_return_date:  dayAdd24Hours});
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })
    it ("should not be able to create a new rental if theres another open to the same user", async () => {
       expect(async () => {
            
            await createRentalUseCase.execute({user_id:"123456", car_id:"45645", expected_return_date: dayAdd24Hours});
            await createRentalUseCase.execute({user_id:"123456", car_id:"45645", expected_return_date: dayAdd24Hours});
       }).rejects.toBeInstanceOf(AppError);
    })

    it ("should not be able to create a new rental with rental time less than 24 hours", async () => {
       expect(async () => {
            await createRentalUseCase.execute({user_id:"123456", car_id:"45645", expected_return_date: new Date()});
       }).rejects.toBeInstanceOf(AppError);
    })
})