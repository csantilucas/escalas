import { Router } from "express";
import { EquipeController } from "../controler/equipeControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const equipeController = new EquipeController();

// CRUD Equipes de Plantão
router.post("/", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.create);
router.get("/", authMiddleware.auth, equipeController.getAll);
router.get("/:id", authMiddleware.auth, equipeController.getById);
router.put("/:id", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.update);
router.delete("/:id", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.delete);

// Vínculo e Gerenciamento de Membros na Equipe
router.post("/:id/membros", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.vincularMembro);
router.post("/vincular", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.vincularMembro);
router.delete("/:id/membros/:userId", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.desvincularMembro);
router.patch("/:id/membros/:userId", authMiddleware.auth, authMiddleware.authAdminOrGestor, equipeController.updateMembro);

export default router;
