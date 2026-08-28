import type { Request, Response } from "express";
import { registroService } from "../../containers/registro.container.js";

export class RegistroController {


  // 1. Criar um novo registro de plantão
  // src/controler/resitroControler.ts

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { plantao_id, user_id, data, startTime, endTime } = req.body;

      if (!plantao_id || !user_id || !data || !startTime || !endTime) {
        return res.status(400).json({ error: "Todos os campos (plantao_id, user_id, data, startTime, endTime) são obrigatórios." });
      }

      const novoRegistro = await registroService.createRegistro({
        plantao_id,
        user_id,
        data,
        startTime,
        endTime
      });

      return res.status(201).json(novoRegistro);
    } catch (error: any) {
      console.error("❌ [RegistroController.create] Erro ao criar registro de plantão:", error.message || error);
      if (error.message.includes("Já existe um plantão agendado")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro interno ao criar registro." });
    }
  };

  // 2. Listar todos os registros
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = 8;
      const resultado = await registroService.getRegistros(page, limit);

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error("❌ [RegistroController.getAll] Erro ao buscar registros paginados:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar registros paginados." });
    }
  };

  // 3. Alterar o usuário de um registro (Transferência de plantão)
  changeUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const { newUserId } = req.body;

      if (!newUserId) {
        return res.status(400).json({ error: "O campo newUserId é obrigatório." });
      }

      const registroAtualizado = await registroService.changeRegistroUser(id, newUserId);
      return res.status(200).json(registroAtualizado);
    } catch (error: any) {
      console.error(`❌ [RegistroController.changeUser] Erro ao alterar usuário do registro '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao alterar usuário do registro." });
    }
  };

  // 4. Atualizar as datas do registro
  updateDates = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const { data, startTime, endTime, ticketZpro } = req.body;

      if (!id) {
        return res.status(400).json({ error: "O parâmetro ID na URL é obrigatório para atualização." });
      }

      const registroAtualizado = await registroService.updateRegistroDates({
        registro_id: id,
        plantao_id: "",
        user_id: "",
        data,
        startTime,
        endTime,
        ticketZpro
      });

      return res.status(200).json(registroAtualizado);
    } catch (error: any) {
      console.error(`❌ [RegistroController.updateDates] Erro ao atualizar registro '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao atualizar registro." });
    }
  };

  getNext = async (req: Request, res: Response): Promise<Response> => {
    try {
      const proximoPlantao = await registroService.getNextActiveRegister();

      if (!proximoPlantao) {
        return res.status(200).json(null);
      }

      return res.status(200).json(proximoPlantao);
    } catch (error: any) {
      console.error("❌ [RegistroController.getNext] Erro ao buscar próximo plantão:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar próximo plantão." });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "O parâmetro ID na URL é obrigatório." });
      }

      const registroId = Array.isArray(id) ? id[0] : id;
      await registroService.deleteRegistro(registroId);

      return res.status(200).json({ message: "Registro excluído com sucesso." });
    } catch (error: any) {
      console.error(`❌ [RegistroController.delete] Erro ao excluir registro '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao excluir registro de plantão." });
    }
  };

  gerarEscala = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { dataInicio, diaSemana, horarioInicio, horarioFim } = req.body;

      if (!dataInicio || diaSemana === undefined || !horarioInicio || !horarioFim) {
        return res.status(400).json({
          error: "Campos obrigatórios ausentes: dataInicio, diaSemana (0 a 6), horarioInicio, horarioFim."
        });
      }

      const registrosCriados = await registroService.gerarEscalaAutomatica({
        dataInicio,
        diaSemana: Number(diaSemana),
        horarioInicio,
        horarioFim
      });

      return res.status(201).json({
        message: `${registrosCriados.length} plantões gerados e distribuídos com sucesso!`,
        registros: registrosCriados
      });
    } catch (error: any) {
      console.error("❌ [RegistroController.gerarEscala] Erro ao gerar escala automática:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao gerar escala automática." });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({ error: "O parâmetro ID na URL é obrigatório." });
      }

      const registro = await registroService.getRegistroById(id);

      if (!registro) {
        return res.status(404).json({ error: "Registro de escala não encontrado." });
      }

      return res.status(200).json(registro);
    } catch (error: any) {
      console.error(`❌ [RegistroController.getById] Erro ao buscar registro '${req.params.id}':`, error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar registro por ID." });
    }
  };
}