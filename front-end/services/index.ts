export { userService } from "./userService";
export { plantonistaService } from "./plantonistaService";
export { registroService } from "./registroService";
export { dashboardService } from "./dashboardService";
export { atendimentoService } from "./atendimentoService";
export { equipeService } from "./equipeService";
export { tokenService } from "./tokenService";
export { distribuicaoService } from "./distribuicaoService";

// Tipagens
export type { LoginModel, CreateUserModel, UserItem } from "./userService";
export type { CreateRegistroModel, UpdateDatesModel, GerarEscalaModel } from "./registroService";
export type { TicketUserData } from "./dashboardService";
export type {
  AtendimentoModel,
  AtendimentoPagination,
  AtendimentoFilterParams,
  AtendimentoListResponse,
  DashboardMetricsResponse,
} from "./atendimentoService";
export type {
  EquipePlantao,
  MembroEquipe,
  TurnoTrabalho,
  CreateEquipeInput,
  UpdateEquipeInput,
  VincularMembroInput,
  UpdateMembroInput,
} from "./equipeService";
export type { ExternalToken, CreateOrUpsertTokenInput, UpdateTokenInput } from "./tokenService";
export type { PrevisaoFila, DistribuirInput, DistribuirResponse } from "./distribuicaoService";