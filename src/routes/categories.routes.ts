import {Router} from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoriesService } from "../services/CreateCategoriesService";

const categoriesRoutes = Router();
const categoryRepository = new PostgresCategoryRepository();

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
