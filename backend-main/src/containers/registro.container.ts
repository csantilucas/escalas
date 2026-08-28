import { RegistroRepository } from "../app/repository/registroRepo.js";
import { RegistroService } from "../app/services/registroService.js";
import { userRepository } from "./user.container.js";
import { PlantonistaRepository } from "../app/repository/plantonistaRepo.js";

const registroRepository = new RegistroRepository();
const plantonistaRepository = new PlantonistaRepository();

export const registroService = new RegistroService(
  registroRepository,
  userRepository,
  plantonistaRepository
);