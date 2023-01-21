import { Router } from "express";
import { cars } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { authentication } from "./login.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/login", authentication);
router.use("/cars", cars);
export {router};