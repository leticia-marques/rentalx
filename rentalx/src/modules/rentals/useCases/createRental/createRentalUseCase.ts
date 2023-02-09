import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/models/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest
{
    user_id:string;
    car_id:string;
    expected_return_date:Date;
}
@injectable()
class CreateRentalUseCase
{
    constructor(@inject("RentalsRepository") private rentalRepository:IRentalsRepository,
         @inject("DayjsDateProvider") private dayjsProvider:IDateProvider,
         @inject("CarsRepository") private carsRepository:ICarsRepository){}

    async execute({car_id, user_id, expected_return_date}:IRequest):Promise<Rental>
    {
        const minimumRentHours = 24;
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if (carUnavailable)
            throw new AppError("Car unavailable");
        
        const rentalOpenToUser = await this.rentalRepository.findOpenRentalToUser(user_id);
        
        if (rentalOpenToUser)
            throw new AppError("There's a rental in progress for user");

        const dateNow = this.dayjsProvider.dateNow();
        const compare = this.dayjsProvider.compareInHours(dateNow, expected_return_date);
        if (compare < minimumRentHours)
            throw new AppError("Invalid return date. Car must be rented for at least 24 hours.");
        const rental = await this.rentalRepository.create({
            car_id:car_id,
            user_id: user_id,
            expected_return_date: this.dayjsProvider.fixDate(expected_return_date)
        });
        await this.carsRepository.updateAvailable(car_id, false)
        return rental;
        
    }
}

export {CreateRentalUseCase}