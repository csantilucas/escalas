import { Router } from "express";
import { ExternalTokenController } from "../controler/tokenControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const tokenController = new ExternalTokenController();

// Todas as rotas de gerenciamento de tokens de serviços externos são protegidas para administradores
router.get("/", authMiddleware.auth, authMiddleware.authAdmin, tokenController.getAll);
router.get("/service/:serviceName", authMiddleware.auth, authMiddleware.authAdmin, tokenController.getByServiceName);
router.get("/:id", authMiddleware.auth, authMiddleware.authAdmin, tokenController.getById);
router.post("/", authMiddleware.auth, authMiddleware.authAdmin, tokenController.createOrUpsert);
router.put("/:id", authMiddleware.auth, authMiddleware.authAdmin, tokenController.update);
router.delete("/:id", authMiddleware.auth, authMiddleware.authAdmin, tokenController.delete);

export default router;
