import "reflect-metadata";
import express, { NextFunction } from "express";
import { Response, Request } from "express";
import "express-async-errors";
import { router } from "@shared/infra/http/routes";
import swaggerUi  from "swagger-ui-express";
import swaggerFile  from '../../../swagger.json';
import "../../container";
import { AppError } from "../../errors/AppError";



const app = express();
app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request: Request,response:Response, next: NextFunction) => {
    if (err instanceof AppError)
    {
        return response.status(err.errorCode).json({
            message: err.message
        });
    }
    else 
    {
        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`
        });
    }
})

export {app};