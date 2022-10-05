import { Router} from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const specificationsRoutes = Router();

import {CreateSpecificationController} from '../modules/cars/useCases/createSpecification/createSpecificationController';

const createSpecificationController= new CreateSpecificationController()

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

// categoriesRoutes.get("/", (req, res) => {
//     const all = SpecificationsRepository.list();
//     res.json(all);
// })

export {specificationsRoutes};