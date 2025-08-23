import { Router } from "express";
import { login, logout, register } from "../controllers/api/v1/authController";

export const authRouterV1: Router = Router();

authRouterV1.post("/api/v1/auth/register", register);

authRouterV1.post("/api/v1/auth/login", login);

authRouterV1.post("/api/v1/auth/logout", logout);