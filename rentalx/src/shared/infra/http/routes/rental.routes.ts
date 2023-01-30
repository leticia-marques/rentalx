import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();

const rental = Router();

rental.post("/", ensureAuthentication, createRentalController.handle);

export {rental};