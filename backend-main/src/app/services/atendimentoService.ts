import type { AtendimentoRepository, AtendimentoFilterQuery } from "../repository/atendimentoRepo.js";
import type { DashboardMetricsQuery } from "../repository/atendimentoRepo.js";
import { sseEventBus } from "../../config/sseEvents.js";


export interface CreateAtendimentoInput {
    ticketZpro: string | number;
    clienteId?: string | null;
    cnpj?: string | null;
    atendente?: string | null;
    protocolo?: string | null;
    nomeContato?: string | null;
    tipoAtendimento?: string | null;
}

export interface UpdateAtendimentoInput {
    ticketZpro: string | number;
    ticketTomticket?: string | null;
    tipoAtendimento?: string | null;
    atendente?: string | null;
    protocolo?: string | null;
    clienteId?: string | null;
    cnpj?: string | null;
    nomeContato?: string | null;
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
        if (!data.ticketZpro) {
            throw new Error("O ID do Z-PRO (ticketZpro) é obrigatório.");
        }

        const ticketZproStr = String(data.ticketZpro).trim();

        if (data.protocolo) {
            const exists = await this.atendimentoRepo.findByProtocolo(data.protocolo);
            if (exists) {
                throw new Error("Já existe um atendimento registrado com este protocolo.");
            }
        }

        // Se o atendimento já foi criado previamente pela rota de distribuição, atualiza os dados preservando o atendente
        const existente = await this.atendimentoRepo.findByTicketZpro(ticketZproStr);
        if (existente) {
            const atualizado = await this.atendimentoRepo.update(existente.id, {
                clienteId: data.clienteId ? String(data.clienteId) : existente.clienteId,
                cnpj: data.cnpj !== undefined ? (data.cnpj ? String(data.cnpj) : null) : existente.cnpj,
                atendente: data.atendente || existente.atendente,
                protocolo: data.protocolo || existente.protocolo,
                nomeContato: data.nomeContato || existente.nomeContato,
                tipoAtendimento: data.tipoAtendimento || existente.tipoAtendimento,
            });
            sseEventBus.notify("atendimento", "update", atualizado);
            return atualizado;
        }

        const novoAtendimento = await this.atendimentoRepo.create({
            ticketZpro: ticketZproStr,
            clienteId: data.clienteId ? String(data.clienteId) : null,
            cnpj: data.cnpj ? String(data.cnpj) : null,
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

    async getProdutividade(startDate?: string, endDate?: string) {
        let dataInicio: Date | undefined;
        let dataFim: Date | undefined;

        if (startDate) {
            const parts = startDate.split("-");
            if (parts.length === 3) {
                dataInicio = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 0, 0, 0, 0);
            } else {
                dataInicio = new Date(startDate);
                dataInicio.setHours(0, 0, 0, 0);
            }
        }

        if (endDate) {
            const parts = endDate.split("-");
            if (parts.length === 3) {
                dataFim = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 23, 59, 59, 999);
            } else {
                dataFim = new Date(endDate);
                dataFim.setHours(23, 59, 59, 999);
            }
        }

        return await this.atendimentoRepo.getProdutividadePorPeriodo(dataInicio, dataFim);
    }

    async atribuirAtendente(
        ticketZpro: string,
        atendenteNome: string,
        dadosExtras?: {
            clienteId?: string | null;
            cnpj?: string | null;
            protocolo?: string | null;
            nomeContato?: string | null;
            tipoAtendimento?: string | null;
        }
    ) {
        const atendimentoAtualizado = await this.atendimentoRepo.upsertAtendentePorTicket(
            ticketZpro,
            atendenteNome,
            dadosExtras
        );

        // 🟢 Notificação SSE para atualizar os dashboards e cards de produtividade em tempo real
        sseEventBus.notify("atendimento", "update", atendimentoAtualizado);

        return atendimentoAtualizado;
    }
}

