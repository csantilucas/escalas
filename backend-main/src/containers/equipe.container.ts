import { EquipeRepository } from "../app/repository/equipeRepo.js";
import { EquipeService } from "../app/services/equipeService.js";
import { userRepo } from "./user.container.js";

const equipeRepo = new EquipeRepository();
const equipeService = new EquipeService(equipeRepo, userRepo);

export { equipeRepo, equipeService };
