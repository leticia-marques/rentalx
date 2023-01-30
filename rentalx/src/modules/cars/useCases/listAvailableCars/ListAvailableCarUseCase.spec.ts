import { ICarDTO } from "@modules/cars/DTOs/ICarDTO";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListAvailableCarUseCase";

let carsRepositoryInMemory:CarsRepositoryInMemory;
let listCarsUseCase:ListCarsUseCase;
describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it ("should be able to list cars by name", async () => {
        const car1 = await carsRepositoryInMemory.create( {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        });
        const car2: ICarDTO = {
            name: "Test name2",
            description: "Test Description2",
            daily_rate: 60,
            license_plate: "aa523s2",
            fine_amount: 0,
            brand: "Test brand2",
            category_id: "1"
        };
        const cars = await listCarsUseCase.execute({name:"Test name"}); 
        expect(cars).toEqual([car1]);
    })

    it ("should be able to list cars by brand", async () => {
        const car1 = await carsRepositoryInMemory.create( {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "1"
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Test name2",
            description: "Test Description2",
            daily_rate: 60,
            license_plate: "aa523s2",
            fine_amount: 0,
            brand: "Test brand2",
            category_id: "1"
        });
        const cars = await listCarsUseCase.execute({brand:"Test brand2"}); 
        expect(cars).toEqual([car2]);
    })

    it ("should be able to list cars by category id", async () => {
        const car1 = await carsRepositoryInMemory.create( {
            name: "Test name",
            description: "Test Description",
            daily_rate: 60,
            license_plate: "aa523s",
            fine_amount: 0,
            brand: "Test brand",
            category_id: "2"
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Test name2",
            description: "Test Description2",
            daily_rate: 60,
            license_plate: "aa523s2",
            fine_amount: 0,
            brand: "Test brand2",
            category_id: "1"
        });
        const cars = await listCarsUseCase.execute({category_id: "1"}); 
        expect(cars).toEqual([car2]);
    })

})