import type { AtendimentoRepository, AtendimentoFilterQuery } from "../repository/atendimentoRepo.js";
import type { DashboardMetricsQuery } from "../repository/atendimentoRepo.js";
import { sseEventBus } from "../../config/sseEvents.js";


export interface CreateAtendimentoInput {

    ticketZpro?: string;

    clienteId?: string;

    cnpj: string;

    atendente?: string;

    protocolo?: string;

    nomeContato?: string;

    tipoAtendimento?: string;

}



export interface UpdateAtendimentoInput {
    ticketZpro: string;
    ticketTomticket?: string;
    tipoAtendimento?: string;
    atendente?: string;
    protocolo?: string;
    clienteId?: string;
    cnpj?: string;
    nomeContato?: string;
}

export class AtendimentoService {
    private atendimentoRepo: AtendimentoRepository;

    constructor(atendimentoRepository: AtendimentoRepository) {
        this.atendimentoRepo = atendimentoRepository;
    }

    async getMetrics(filters: DashboardMetricsQuery) {
        return await this.atendimentoRepo.getDashboardMetrics(filters);
    }

    async getAtendimentosPorAnalista(nomeAnalista: string, filters: AtendimentoFilterQuery) {
        if (!nomeAnalista) {
            throw new Error("O nome do analista é obrigatório.");
        }

        return await this.atendimentoRepo.findWithFilters({
            ...filters,
            atendente: nomeAnalista,
        });
    }

    async createAtendimento(data: CreateAtendimentoInput) {
        if (!data.cnpj) {
            throw new Error("O campo 'cnpj' é obrigatório.");
        }

        if (data.protocolo) {
            const exists = await this.atendimentoRepo.findByProtocolo(data.protocolo);
            if (exists) {
                throw new Error("Já existe um atendimento registrado com este protocolo.");
            }
        }

        const novoAtendimento = await this.atendimentoRepo.create({
            ticketZpro: data.ticketZpro ? String(data.ticketZpro) : null,
            clienteId: data.clienteId ? String(data.clienteId) : null,
            cnpj: String(data.cnpj),
            atendente: data.atendente || null,
            protocolo: data.protocolo || null,
            nomeContato: data.nomeContato || null,
            tipoAtendimento: data.tipoAtendimento || null,
            sincronizado: false,
        });

        // 🟢 Notificação SSE para o Dashboard em tempo real
        sseEventBus.notify("atendimento", "create", novoAtendimento);

        return novoAtendimento;
    }

    async updateAtendimento(data: UpdateAtendimentoInput) {
        if (!data.ticketZpro) {
            throw new Error("O 'ticketZpro' é obrigatório para atualização.");
        }

        const atendimento = await this.atendimentoRepo.findByTicketZpro(String(data.ticketZpro));

        if (!atendimento) {
            throw new Error("Atendimento não encontrado para o ticket Z-PRO informado.");
        }

        const updateData: any = {
            sincronizado: true, // 🟢 Sincronizado ao receber os dados do Tomticket
        };

        if (data.ticketTomticket !== undefined) updateData.ticketTomticket = data.ticketTomticket ? String(data.ticketTomticket) : null;
        if (data.tipoAtendimento !== undefined) updateData.tipoAtendimento = data.tipoAtendimento;
        if (data.atendente !== undefined) updateData.atendente = data.atendente;
        if (data.protocolo !== undefined) updateData.protocolo = data.protocolo;
        if (data.clienteId !== undefined) updateData.clienteId = data.clienteId;
        if (data.cnpj !== undefined) updateData.cnpj = data.cnpj;
        if (data.nomeContato !== undefined) updateData.nomeContato = data.nomeContato;

        const atendimentoAtualizado = await this.atendimentoRepo.update(atendimento.id, updateData);

        // 🟢 Notificação SSE para o Dashboard em tempo real
        sseEventBus.notify("atendimento", "update", atendimentoAtualizado);

        return atendimentoAtualizado;
    }



    async getAtendimentos(filters: AtendimentoFilterQuery) {

        return await this.atendimentoRepo.findWithFilters(filters);

    }

}

