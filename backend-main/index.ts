import app, { bootstrap } from "./src/config/server.js";

if (!process.env.PORT) {
  throw new Error("Verifique a variável de ambiente PORT");
}
if (!process.env.HOST) {
  throw new Error("Verifique a variável de ambiente HOST");
}

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

app.listen(PORT, HOST, async () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  try {
    await bootstrap();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error);
    process.exit(1);
  }
});