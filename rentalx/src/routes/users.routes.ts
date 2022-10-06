import { Router } from "express";

const usersRoutes = Router();

import {CreateUserController} from "../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const userController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController()
;usersRoutes.post("/", userController.handle);
usersRoutes.patch("/avatar", updateUserAvatarController.handle);
export {usersRoutes}