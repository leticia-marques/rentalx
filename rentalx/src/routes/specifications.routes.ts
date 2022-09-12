import { Router} from "express";

const specificationsRoutes = Router();

import {createSpecificationController} from '../modules/cars/useCases/createSpecification';

specificationsRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
})

// categoriesRoutes.get("/", (req, res) => {
//     const all = SpecificationsRepository.list();
//     res.json(all);
// })

export {specificationsRoutes};