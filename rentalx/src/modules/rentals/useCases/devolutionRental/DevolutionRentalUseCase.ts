import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/models/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DevolutionRentalUseCase
{
    constructor(@inject("RentalsRepository") private rentalRepository:IRentalsRepository,
                 @inject("DayjsDateProvider") private dayjsProvider:IDateProvider,
                @inject("CarsRepository") private carsRepository:ICarsRepository){}
    async execute(rental_id:string):Promise<Rental>
    {
        const rental = await this.rentalRepository.findById(rental_id)
        const car = await this.carsRepository.findById(rental.car_id);
        const minimumDaily = 1;
        if (!rental)
            throw new AppError("Rental does'nt exist");
        
        const dateNow = this.dayjsProvider.dateNow();
        let  daily = this.dayjsProvider.compareInDay(rental.start_date, dateNow);
        const delay = this.dayjsProvider.compareInDay(dateNow, rental.expected_return_date);
        
        if (daily <= 0)
            daily = minimumDaily;
        let total = 0;
        if (delay > 0)
        {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        total += daily * car.daily_rate;
        rental.end_date = dateNow;
        rental.total = total;
        await this.rentalRepository.update(rental.id, dateNow, total);
        await this.carsRepository.updateAvailable(car.id, true);
        return rental;
    }
}

export {DevolutionRentalUseCase}