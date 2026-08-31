// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controler/userControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const userController = new UserController();

// Rotas de Usuários
router.get("/profile", authMiddleware.auth, userController.getProfile);
router.put("/profile", authMiddleware.auth, userController.updateProfile);

router.post("/", authMiddleware.auth, authMiddleware.authAdmin, userController.create);
router.get("/", authMiddleware.auth, userController.getAll);
router.get("/:id", authMiddleware.auth, userController.getById);
router.put("/:id", authMiddleware.auth, authMiddleware.authAdmin, userController.update);
router.delete("/:id", authMiddleware.auth, authMiddleware.authAdmin, userController.delete);

export default router;