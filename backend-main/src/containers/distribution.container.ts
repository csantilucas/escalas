import { equipeRepo } from "./equipe.container.js";
import { DistribuicaoLogRepository } from "../app/repository/distribuicaoLogRepo.js";
import { DistributionService } from "../app/services/distributionService.js";

const distribuicaoLogRepo = new DistribuicaoLogRepository();
const distributionService = new DistributionService(equipeRepo, distribuicaoLogRepo);

export { distributionService, distribuicaoLogRepo };
