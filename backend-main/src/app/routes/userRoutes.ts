// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controler/userControler.js";
import { authMiddleware } from "../../containers/auth.container.js";


const router = Router();
const userController = new UserController();


router.post("/", authMiddleware.auth, authMiddleware.authAdmin, userController.create);
router.get("/", authMiddleware.auth, userController.getAll);

export default router;