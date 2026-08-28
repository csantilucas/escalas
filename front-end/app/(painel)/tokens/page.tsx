"use client";

import { useEffect, useState } from "react";
import { tokenService, ExternalToken } from "@/services";
import {
  KeyRound,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  Copy,
  Globe,
} from "lucide-react";

export default function TokensPage() {
  const [tokens, setTokens] = useState<ExternalToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingToken, setEditingToken] = useState<ExternalToken | null>(null);
  const [serviceName, setServiceName] = useState("zpro");
  const [tokenValue, setTokenValue] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Visibilidade de tokens
  const [revealedTokens, setRevealedTokens] = useState<Record<string, boolean>>({});

  const defaultUrls: Record<string, string> = {
    zpro: "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6",
    alpha_dash: "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6/dash",
    tomticket: "https://api.tomticket.com/v2.0/ticket/list",
  };

  const loadTokens = async () => {
    try {
      setLoading(true);
      const data = await tokenService.getAll();
      setTokens(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao carregar tokens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const openCreateModal = () => {
    setEditingToken(null);
    setServiceName("zpro");
    setTokenValue("");
    setApiUrl(defaultUrls["zpro"] || "");
    setDescription("");
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (tok: ExternalToken) => {
    setEditingToken(tok);
    setServiceName(tok.serviceName);
    setTokenValue(tok.token);
    setApiUrl(tok.apiUrl || defaultUrls[tok.serviceName.toLowerCase()] || "");
    setDescription(tok.description || "");
    setIsActive(tok.isActive);
    setModalOpen(true);
  };

  const handleServiceChange = (newService: string) => {
    setServiceName(newService);
    if (!editingToken && !apiUrl) {
      setApiUrl(defaultUrls[newService] || "");
    }
  };

  const handleSaveToken = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      if (editingToken) {
        await tokenService.update(editingToken.id, {
          serviceName,
          token: tokenValue,
          apiUrl: apiUrl.trim() || undefined,
          description,
          isActive,
        });
        setSuccessMsg(`Token e URL do serviço '${serviceName}' atualizados com sucesso!`);
      } else {
        await tokenService.createOrUpsert({
          serviceName,
          token: tokenValue,
          apiUrl: apiUrl.trim() || undefined,
          description,
          isActive,
        });
        setSuccessMsg(`Token e URL do serviço '${serviceName}' salvos com sucesso!`);
      }
      setModalOpen(false);
      loadTokens();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao salvar token.");
    }
  };

  const handleDeleteToken = async (id: string, name: string) => {
    if (!confirm(`Deseja remover o token de '${name}'?`)) return;
    try {
      await tokenService.delete(id);
      setSuccessMsg(`Token '${name}' removido com sucesso!`);
      loadTokens();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao remover token.");
    }
  };

  const toggleReveal = (id: string) => {
    setRevealedTokens((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, label: string = "Token") => {
    navigator.clipboard.writeText(text);
    setSuccessMsg(`${label} copiado para a área de transferência!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const serviceBadges: Record<string, { label: string; color: string }> = {
    zpro: { label: "Z-PRO WhatsApp", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
    alpha_dash: { label: "Alpha Software Dash", color: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
    tomticket: { label: "Tomticket API", color: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">Tokens & URLs de Serviços Externos</h1>
              <p className="text-sm text-zinc-400">
                Gerencie as credenciais e os endpoints de integração (Z-PRO, Alpha Software e Tomticket) em tempo real.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Token / URL</span>
        </button>
      </div>

      {/* FEEDBACKS */}
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between text-red-300 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-300 text-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LISTAGEM DE TOKENS */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-zinc-400">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
          Carregando credenciais...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tokens.map((tok) => {
            const badge = serviceBadges[tok.serviceName.toLowerCase()] || {
              label: tok.serviceName,
              color: "bg-zinc-800 text-zinc-300",
            };
            const isRevealed = revealedTokens[tok.id] || false;
            const currentUrl = tok.apiUrl || defaultUrls[tok.serviceName.toLowerCase()] || "URL Padrão do Sistema";

            return (
              <div
                key={tok.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        tok.isActive ? "text-emerald-400" : "text-zinc-500"
                      }`}
                    >
                      {tok.isActive ? "● Ativo" : "○ Inativo"}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mt-2">
                    {tok.description || "Nenhuma descrição informada"}
                  </p>

                  {/* URL DO ENDPOINT */}
                  <div className="mt-3 p-2.5 bg-zinc-950/60 border border-zinc-800/80 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-cyan-400" />
                        URL da API / Endpoint
                      </span>
                      <button
                        onClick={() => copyToClipboard(currentUrl, "URL da API")}
                        className="text-zinc-500 hover:text-zinc-300 p-0.5"
                        title="Copiar URL"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs font-mono text-cyan-300 truncate" title={currentUrl}>
                      {currentUrl}
                    </p>
                  </div>

                  {/* VISUALIZADOR DE TOKEN */}
                  <div className="mt-2.5 p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-zinc-300 truncate">
                      {isRevealed
                        ? tok.token
                        : tok.token.substring(0, 6) + "••••••••••••••••" + tok.token.substring(tok.token.length - 4)}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleReveal(tok.id)}
                        className="p-1 text-zinc-500 hover:text-zinc-300"
                        title={isRevealed ? "Ocultar" : "Revelar"}
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(tok.token, "Token")}
                        className="p-1 text-zinc-500 hover:text-zinc-300"
                        title="Copiar Token"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 text-xs text-zinc-500">
                  <span>Atualizado: {new Date(tok.updatedAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(tok)}
                      className="p-1 text-zinc-400 hover:text-zinc-200"
                      title="Editar Token / URL"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteToken(tok.id, tok.serviceName)}
                      className="p-1 text-zinc-500 hover:text-red-400"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-100">
                {editingToken ? "Editar Token e URL de API" : "Novo Token / URL de Serviço"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-zinc-400 hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveToken} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Serviço *</label>
                <select
                  value={serviceName}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="zpro">Z-PRO (API WhatsApp)</option>
                  <option value="alpha_dash">Alpha Software Dash (Chamados)</option>
                  <option value="tomticket">Tomticket (Relatórios)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">URL da API / Endpoint (Opcional)</label>
                <input
                  type="url"
                  placeholder={defaultUrls[serviceName.toLowerCase()] || "https://..."}
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm font-mono focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Se deixado em branco, o sistema usará a URL padrão do serviço.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Token de Autenticação *</label>
                <input
                  type="text"
                  required
                  placeholder="Insira o Bearer Token ou chave secreta"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Endpoint de produção para sincronização"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
                  />
                  <span>Token Ativo</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Salvar Token & URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
