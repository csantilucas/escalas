// src/services/index.ts

export { userService } from "./userService";
export { plantonistaService } from "./plantonistaService";
export { registroService } from "./registroService";
export { dashboardService } from "./dashboardService";
export { atendimentoService } from "./atendimentoService";

// Tipagens
export type { LoginModel, CreateUserModel } from "./userService";
export type { CreateRegistroModel, UpdateDatesModel, GerarEscalaModel } from "./registroService";
export type { TicketUserData } from "./dashboardService";
export type {
  AtendimentoModel,
  AtendimentoPagination,
  AtendimentoFilterParams,
  AtendimentoListResponse,
  DashboardMetricsResponse
} from "./atendimentoService"; // 🟢