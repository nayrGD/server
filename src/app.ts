import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

import { StudentRepository } from "./repository/studentRepository";
import { StudentService } from "./service/studentService";
import { StudentController } from "./controller/studentController";

import { AuthService } from "./service/AuthService";
import { AuthController } from "./controller/AuthController";

import { createStudentRoutes } from "./routes/studentRoutes";

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

const studentRepository = new StudentRepository(db);

const studentService = new StudentService(
  studentRepository
);

const studentController = new StudentController(
  studentService
);

const authService = new AuthService(
  studentRepository
);

const authController = new AuthController(
  authService
);

app.post(
  "/login",
  authController.login
);

app.use(
  "/student",
  createStudentRoutes(studentController)
);

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});