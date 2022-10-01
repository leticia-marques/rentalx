import {Router} from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const upload = multer({dest:"./tmp"});
const categoriesRoutes = Router();


categoriesRoutes.post("/", (req, res) => {
	return createCategoryController().handle(req, res);
})

categoriesRoutes.get('/', (req, res) => {
	return listCategoriesController.handle(req, res);
})

categoriesRoutes.post('/upload', upload.single("file"), (req, res) => {
	return importCategoryController.handle(req, res);

})
export {categoriesRoutes};
