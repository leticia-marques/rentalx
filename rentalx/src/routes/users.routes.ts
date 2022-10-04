import { Router } from "express";

const usersRoutes = Router();

import {CreateUserController} from "../modules/accounts/useCases/createUser/createUserController";

const userController = new CreateUserController();
usersRoutes.post("/", userController.handle);
export {usersRoutes}