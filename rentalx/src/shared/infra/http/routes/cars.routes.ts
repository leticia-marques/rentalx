import { CarsRepository } from "@modules/cars/infra/Prisma/repositories/CarsRepository";
import { AddCarImagesController } from "@modules/cars/useCases/addCarImages/addCarImagesController";
import { AddCarSpecificationsController } from "@modules/cars/useCases/addCarSpecification/addCarSpecificationsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";

import uploadConfig from "@config/upload";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const cars = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const addCarsSpecificationsController = new AddCarSpecificationsController();
const addCarImagesController = new AddCarImagesController();
const upload = multer(uploadConfig.upload("./tmp/cars"));

cars.post("/", ensureAuthentication, ensureAdmin, createCarController.handle);
cars.get("/available", listAvailableCars.handle);
cars.post("/specifications/:id", ensureAuthentication, ensureAdmin, addCarsSpecificationsController.handle);
cars.post("/images/:id", ensureAuthentication, ensureAdmin, upload.array("images"), addCarImagesController.handle);
export{cars}