import {Router} from "express";
import multer from "multer";

import {CreateCategoryController} from "@modules/cars/useCases/createCategory/createCategoryController";
import {  ImportCategoriesController } from "@modules/cars/useCases/importCategories/importCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCateforiesController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";
const categoriesRoutes = Router();

const upload = multer({dest:"./tmp"});

const importCategoriesController = new ImportCategoriesController();
const categoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthentication, ensureAdmin,categoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/upload', upload.single("file"), ensureAuthentication, ensureAdmin, importCategoriesController.handle)
export {categoriesRoutes};
