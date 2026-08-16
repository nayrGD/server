import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

import { EtudiantRepository } from "./repository/EtudiantRepository.js";
import { EtudiantService } from "./service/EtudiantService.js";
import { EtudiantController } from "./controller/EtudiantController.js";

import { AuthService } from "./service/AuthService.js";
import { AuthController } from "./controller/AuthController.js";

import { createEtudiantRoutes } from "./routes/etudiantRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
});

const etudiantRepository = new EtudiantRepository(db);

const etudiantService = new EtudiantService(
  etudiantRepository
);

const etudiantController = new EtudiantController(
  etudiantService
);

const authService = new AuthService(
  etudiantRepository
);

const authController = new AuthController(
  authService
);

app.post(
  "/login",
  authController.login
);

app.use(
  "/etudiants",
  createEtudiantRoutes(etudiantController)
);

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});