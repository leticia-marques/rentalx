import { CarsRepository } from "@modules/cars/infra/Prisma/repositories/CarsRepository";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const cars = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();

cars.post("/", ensureAuthentication, ensureAdmin, createCarController.handle);
cars.get("/available", listAvailableCars.handle);
export{cars}