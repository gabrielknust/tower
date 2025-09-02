import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da conexão
export const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined, // Porta padrão do PostgreSQL
});
