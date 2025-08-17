import { Router } from "express";
import { login, logout, register } from "../controllers/api/v1/authController";

export const authRouter: Router = Router();

authRouter.post("auth/register", register);

authRouter.post("auth/login", login);

authRouter.post("auth/logout", logout);