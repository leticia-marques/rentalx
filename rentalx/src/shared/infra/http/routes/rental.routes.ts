import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalController } from "@modules/rentals/useCases/listRentals/listRentalController";
import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalController = new ListRentalController()
const rental = Router();

rental.post("/", ensureAuthentication, createRentalController.handle);
rental.post("/devolution/:id", ensureAuthentication, devolutionRentalController.handle);
rental.get("/", ensureAuthentication, listRentalController.handle);
export {rental};