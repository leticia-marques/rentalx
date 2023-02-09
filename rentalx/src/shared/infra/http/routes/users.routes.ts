import { Router } from "express";
import multer from "multer";


import {CreateUserController} from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import upload from "@config/upload";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const uploadAvatar = multer(upload);

const usersRoutes = Router();
const userController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();


usersRoutes.post("/", userController.handle);
usersRoutes.patch("/avatar", ensureAuthentication, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export {usersRoutes}