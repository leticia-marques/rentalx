import {Router} from "express";
import multer from "multer";

import {CreateCategoryController} from "@modules/cars/useCases/createCategory/createCategoryController";
import {  ImportCategoryController } from "@modules/cars/useCases/importCategories/importCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCateforiesController";
const categoriesRoutes = Router();

const upload = multer({dest:"./tmp"});

const importCategoriesController = new ImportCategoryController();
const categoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", categoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/upload', upload.single("file"), importCategoriesController.handle)
export {categoriesRoutes};
