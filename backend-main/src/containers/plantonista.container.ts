import { PlantonistaRepository } from "../app/repository/plantonistaRepo.js";
import { PlantonistaService } from "../app/services/plantonistaService.js";
import { userRepository } from "./user.container.js";

const plantonistaRespository = new PlantonistaRepository();

export const plantonistaService = new PlantonistaService(plantonistaRespository, userRepository);