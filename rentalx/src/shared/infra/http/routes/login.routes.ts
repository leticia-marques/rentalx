import { Router} from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/refreshTokenController";

const authenticationController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authentication = Router();

authentication.post('/', authenticationController.handle);
authentication.post("/refresh-token", refreshTokenController.handle);
export {authentication}
