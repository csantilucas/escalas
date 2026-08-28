import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sem importar em cada arquivo
    environment: 'node',
    fileParallelism: false, // Executa os arquivos de teste sequencialmente para não concorrer no banco de dados
  },
});