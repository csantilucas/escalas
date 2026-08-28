// src/services/registroService.ts
import type { RegistroRepository } from "../repository/registroRepo.js";
import type { UserRepository } from "../repository/userRepo.js";
import type { PlantonistaRepository } from "../repository/plantonistaRepo.js";
import { sseEventBus } from "../../config/sseEvents.js";

interface Registro {
  registro_id?: string;
  plantao_id: string;
  user_id: string;
  data: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  ticketZpro?: string;
}

export class RegistroService {
  private registro: RegistroRepository;
  private user: UserRepository;
  private plantonistaRepo: PlantonistaRepository;

  constructor(
    registroRepository: RegistroRepository,
    userRepository: UserRepository,
    plantonistaRepository: PlantonistaRepository
  ) {
    this.registro = registroRepository;
    this.user = userRepository;
    this.plantonistaRepo = plantonistaRepository;
  }

  async getRegistroById(id: string): Promise<any> {
    return await this.registro.findById(id);
  }

  async createRegistro(data: Registro): Promise<any> {
    const dataFormatada = new Date(data.data);

    // Impede a criação isolada manual se já existir plantão nesta data
    const conflito = await this.registro.findByDate(dataFormatada);
    if (conflito) {
      throw new Error(`Já existe um plantão agendado para o dia ${dataFormatada.toLocaleDateString("pt-BR")}.`);
    }

    const formattedData = {
      plantao_id: data.plantao_id,
      user_id: data.user_id,
      data: dataFormatada,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    };

    const novoRegistro = await this.registro.create(formattedData);
    await this.plantonistaRepo.updatePlantonistaDate(data.plantao_id, dataFormatada);

    sseEventBus.notify("registro", "create", novoRegistro);
    return novoRegistro;
  }

  async getRegistros(page: number = 1, limit: number = 8): Promise<{ registros: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [registros, total] = await Promise.all([
      this.registro.findPaginated(skip, take),
      this.registro.countAll(),
    ]);

    return {
      registros,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async changeRegistroUser(registroId: string, newUserId: string) {
    const registro = await this.registro.findById(registroId);
    if (!registro) {
      throw new Error("Registro não encontrado.");
    }

    const userExists = await this.user.findById(newUserId);
    if (!userExists) {
      throw new Error("Novo usuário não encontrado.");
    }

    const updated = await this.registro.update(registroId, { user_id: newUserId });
    sseEventBus.notify("registro", "update", updated);
    return updated;
  }

  async updateRegistroDates(data: Registro): Promise<any> {
    if (!data.registro_id) {
      throw new Error("ID do registro é obrigatório para atualização.");
    }

    const registroExistente: any = await this.registro.findById(data.registro_id);
    if (!registroExistente) {
      throw new Error("Registro não encontrado.");
    }

    const updateData: any = {};

    if (data.data) {
      updateData.data = new Date(data.data);
      await this.plantonistaRepo.updatePlantonistaDate(registroExistente.plantao_id, updateData.data);
    }
    if (data.startTime) updateData.startTime = new Date(data.startTime);
    if (data.endTime) updateData.endTime = new Date(data.endTime);

    if (data.ticketZpro) {
      updateData.ticketZpro = data.ticketZpro;
    }

    const updated = await this.registro.update(data.registro_id, updateData);
    sseEventBus.notify("registro", "update", updated);
    return updated;
  }

  async getNextActiveRegister(): Promise<any> {
    return await this.registro.findNextActive();
  }

  async deleteRegistro(id: string): Promise<any> {
    const registroExistente = await this.registro.findById(id);

    if (!registroExistente) {
      throw new Error("Registro não encontrado.");
    }
    const deleted = await this.registro.delete(id);
    sseEventBus.notify("registro", "delete", { id });
    return deleted;
  }

  async gerarEscalaAutomatica(params: {
    dataInicio: string;
    diaSemana: number;
    horarioInicio: string;
    horarioFim: string;
  }): Promise<any> {
    const plantonistas = await this.plantonistaRepo.findAllOrderedByPosicao();

    if (!plantonistas || plantonistas.length === 0) {
      throw new Error("Nenhum plantonista cadastrado para distribuir a escala.");
    }

    const dataBase = new Date(params.dataInicio);
    const registrosCriados = [];

    const [startHour, startMin] = params.horarioInicio.split(":").map(Number);
    const [endHour, endMin] = params.horarioFim.split(":").map(Number);

    let diasAteAlvo = (params.diaSemana - dataBase.getUTCDay() + 7) % 7;
    let dataAtual = new Date(dataBase);
    dataAtual.setUTCDate(dataAtual.getUTCDate() + diasAteAlvo);

    for (let i = 0; i < plantonistas.length; i++) {
      const plantonista = plantonistas[i];

      const dataPlantao = new Date(dataAtual);
      dataPlantao.setUTCDate(dataAtual.getUTCDate() + i * 7);
      dataPlantao.setUTCHours(0, 0, 0, 0);

      const conflito = await this.registro.findByDate(dataPlantao);
      if (conflito) {
        throw new Error(
          `Geração interrompida: O dia ${dataPlantao.toLocaleDateString("pt-BR")} já possui um plantão cadastrado.`
        );
      }

      const startTime = new Date(dataPlantao);
      startTime.setUTCHours(startHour, startMin, 0, 0);

      const endTime = new Date(dataPlantao);
      endTime.setUTCHours(endHour, endMin, 0, 0);

      if (endTime < startTime) {
        endTime.setUTCDate(endTime.getUTCDate() + 1);
      }

      const payloadRegistro = {
        plantao_id: plantonista.id,
        user_id: plantonista.userId,
        data: dataPlantao,
        startTime: startTime,
        endTime: endTime,
      };

      const novoRegistro = await this.registro.create(payloadRegistro);
      await this.plantonistaRepo.updatePlantonistaDate(plantonista.id, dataPlantao);

      registrosCriados.push(novoRegistro);
    }

    sseEventBus.notify("registro", "bulk_create", registrosCriados);
    return registrosCriados;
  }
}