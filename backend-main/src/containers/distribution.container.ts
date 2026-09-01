import { equipeRepo } from "./equipe.container.js";
import { DistribuicaoLogRepository } from "../app/repository/distribuicaoLogRepo.js";
import { DistributionService } from "../app/services/distributionService.js";
import { atendimentoRepository } from "./atendimento.container.js";

const distribuicaoLogRepo = new DistribuicaoLogRepository();
const distributionService = new DistributionService(
  equipeRepo,
  distribuicaoLogRepo,
  atendimentoRepository
);

export { distributionService, distribuicaoLogRepo };
