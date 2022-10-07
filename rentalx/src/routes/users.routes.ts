import { Router } from "express";
import multer from "multer";

const usersRoutes = Router();

import {CreateUserController} from "../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController()
;usersRoutes.post("/", userController.handle);
usersRoutes.patch("/avatar", ensureAuthentication, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
export {usersRoutes}