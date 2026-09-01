import { AtendimentoRepository } from "../app/repository/atendimentoRepo.js";
import { AtendimentoService } from "../app/services/atendimentoService.js";

const atendimentoRepository = new AtendimentoRepository();
export const atendimentoService = new AtendimentoService(atendimentoRepository);
export { atendimentoRepository };