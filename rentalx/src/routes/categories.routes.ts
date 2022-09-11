import {Router} from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { PostgresCategoryRepository } from "../repositories/PostgresCategoryRepository";
import { CreateCategoriesService } from "../services/CreateCategoriesService";

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
	const {name, description} =  req.body;
	const categoryService = new CreateCategoriesService(categoryRepository);
	categoryService.execute({name, description});
	return res.status(201).send();
})

categoriesRoutes.get('/', (req, res) => {
	const all = categoryRepository.list();
	res.json(all);
})
export {categoriesRoutes};
