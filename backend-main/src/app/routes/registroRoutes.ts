// src/routes/registroRoutes.ts
import { Router } from "express";
import { RegistroController } from "../controler/resitroControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const registroController = new RegistroController();


router.get("/next", registroController.getNext);
router.get("/find", authMiddleware.auth, registroController.getAll);
router.post("/", authMiddleware.auth, authMiddleware.authAdmin, registroController.create);
router.patch("/change-user/:id", authMiddleware.auth, authMiddleware.authAdmin, registroController.changeUser);
router.put("/:id", authMiddleware.auth, authMiddleware.authAdmin, registroController.updateDates);
router.delete("/:id", authMiddleware.auth, authMiddleware.authAdmin, registroController.delete);
router.post("/gerar", authMiddleware.auth, authMiddleware.authAdmin, registroController.gerarEscala);
router.get("/:id", authMiddleware.auth, registroController.getById);

export default router;