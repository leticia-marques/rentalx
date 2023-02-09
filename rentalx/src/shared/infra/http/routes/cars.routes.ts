import { Router } from "express";
import multer from "multer";
import upload from "@config/upload";

import { AddCarImagesController } from "@modules/cars/useCases/addCarImages/addCarImagesController";
import { AddCarSpecificationsController } from "@modules/cars/useCases/addCarSpecification/addCarSpecificationsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const cars = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const addCarsSpecificationsController = new AddCarSpecificationsController();
const addCarImagesController = new AddCarImagesController();
const uploadCar = multer(upload);

cars.post("/", ensureAuthentication, ensureAdmin, createCarController.handle);
cars.get("/available", listAvailableCars.handle);
cars.post("/specifications/:id", ensureAuthentication, ensureAdmin, addCarsSpecificationsController.handle);
cars.post("/images/:id", ensureAuthentication, ensureAdmin, uploadCar.array("images"), addCarImagesController.handle);
export{cars}