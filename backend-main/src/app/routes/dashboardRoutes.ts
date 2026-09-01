import { Router } from "express";
import { DashboardController } from "../controler/dasboardControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const dashboardController = new DashboardController();

// 🟢 Rotas SSE (Server-Sent Events) em Tempo Real
router.get("/stream", authMiddleware.auth, dashboardController.streamEvents);
router.get("/events", authMiddleware.auth, dashboardController.streamEvents);

// 🟢 Rota de Visão Geral Consolidada
router.get("/overview", authMiddleware.auth, dashboardController.getOverview);

// Rota 1: Produtividade dos Analistas (Tabela Interna de Atendimentos)
router.get("/tickets", dashboardController.getTicketsReport);

// Rota 2: Tomticket
router.get("/tomticket", authMiddleware.auth, authMiddleware.authAdminOrGestor, dashboardController.getTomticketReport);

export default router;