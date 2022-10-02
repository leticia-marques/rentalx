import {Router} from "express";
import multer from "multer";

import {CreateCategoryController} from "../modules/cars/useCases/createCategory/createCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const upload = multer({dest:"./tmp"});
const categoriesRoutes = Router();
const categoryController = new CreateCategoryController();

categoriesRoutes.post("/", categoryController.handle);

categoriesRoutes.get('/', (req, res) => {
	return listCategoriesController.handle(req, res);
})

categoriesRoutes.post('/upload', upload.single("file"), (req, res) => {
	return importCategoryController.handle(req, res);

})
export {categoriesRoutes};
