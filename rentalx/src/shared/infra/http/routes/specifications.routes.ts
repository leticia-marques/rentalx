import { Router} from "express";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const specificationsRoutes = Router();

import {CreateSpecificationController} from '@modules/cars/useCases/createSpecification/createSpecificationController';
import { ensureAdmin } from "../middlewares/ensureAdmin";

const createSpecificationController= new CreateSpecificationController()

// specificationsRoutes.use(ensureAuthentication);

specificationsRoutes.post("/", ensureAuthentication, ensureAdmin, createSpecificationController.handle);

export {specificationsRoutes};