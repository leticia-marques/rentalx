import { Router} from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/authenticateUserController";

const authenticationController = new AuthenticateUserController();

const authentication = Router();

authentication.post('/', authenticationController.handle);

export {authentication}
