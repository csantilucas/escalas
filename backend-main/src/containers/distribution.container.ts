import { equipeRepo } from "./equipe.container.js";
import { DistributionService } from "../app/services/distributionService.js";

const distributionService = new DistributionService(equipeRepo);

export { distributionService };
