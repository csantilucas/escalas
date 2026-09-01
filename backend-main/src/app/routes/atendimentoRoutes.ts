import { Router } from "express";
import { AtendimentoController } from "../controler/atendimentoControler.js";
import { DistributionController } from "../controler/distributionControler.js";

const router = Router();
const atendimento = new AtendimentoController();
const distribution = new DistributionController();

// 🟢 Rota de Distribuição Dinâmica para o n8n
router.post("/distribuir", distribution.distribuir);
router.get("/distribuir", distribution.distribuir);
router.get("/previsao", distribution.getPrevisao);

// 🟢 Rotas de Histórico e Auditoria de Distribuição
router.get("/distribuicao/logs", distribution.getLogs);
router.get("/distribuicao/recentes", distribution.getRecentes);

// Rotas de Atendimentos
router.post("/", atendimento.create);
router.put("/", atendimento.update);
router.patch("/", atendimento.update);
router.patch("/atualizar", atendimento.update);
router.get("/", atendimento.getAll);

// Métricas e Filtros
router.get("/metrics", atendimento.getMetrics);
router.get("/analista/:analista", atendimento.getByAnalista);

export default router;