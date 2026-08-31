import type { Request, Response } from "express";
import { distributionService } from "../../containers/distribution.container.js";

export class DistributionController {
  distribuir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = {
        ...(typeof req.query === "object" && req.query ? req.query : {}),
        ...(typeof req.body === "object" && req.body ? req.body : {}),
      };

      const departamento = data.departamento || data.depto || data.area || data.department;
      const fila = data.fila || data.queue || data.queueName;
      const ticketId = data.ticketId || data.ticketID || data.ticket;
      const clienteId = data.clienteId || data.clienteID;
      const numero = data.numero || data.Number || data.phone || data.number;
      const horarioMinutosOverride = data.horarioMinutosOverride
        ? Number(data.horarioMinutosOverride)
        : undefined;
      const ignorarApisExternas =
        data.ignorarApisExternas === true || data.ignorarApisExternas === "true";

      const resultado = await distributionService.distribuir({
        departamento: departamento ? String(departamento) : undefined,
        fila: fila ? String(fila) : undefined,
        ticketId,
        clienteId,
        numero: numero ? String(numero) : undefined,
        horarioMinutosOverride,
        ignorarApisExternas,
      });

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error("❌ [DistributionController] Erro ao distribuir atendimento:", error);
      return res.status(500).json({
        sucesso: false,
        status: "pending",
        userId: null,
        atendenteNome: null,
        queueId: 6,
        queueName: "N1-Suporte",
        modoDistribuicao: "erro_interno",
        error: error.message,
      });
    }
  };

  getPrevisao = async (req: Request, res: Response): Promise<Response> => {
    try {
      const previsao = await distributionService.getPrevisaoFilas();
      return res.status(200).json(previsao);
    } catch (error: any) {
      console.error("❌ [DistributionController.getPrevisao] Erro ao obter previsão de filas:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  };
}
