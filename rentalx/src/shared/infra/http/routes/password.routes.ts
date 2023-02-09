import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/resetUserPasswordController";
import { SendRetrievePasswordEmailController } from "@modules/accounts/useCases/sendRetrievePasswordEmail/sendRetrievePasswordEmailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendRetrievePasswordEmailController = new SendRetrievePasswordEmailController();
const resetUserPassword = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendRetrievePasswordEmailController.handle);
passwordRoutes.post("/reset", resetUserPassword.handle);
export {passwordRoutes}