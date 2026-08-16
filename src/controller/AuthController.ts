import { Request, Response } from "express";
import { AuthService } from "../service/AuthService.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  login = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        res.status(400).json({
          message: "Email et mot de passe requis"
        });
        return;
      }

      const token = await this.authService.login(
        email,
        password
      );

      if (!token) {
        res.status(401).json({
          message: "Identifiants invalides"
        });
        return;
      }

      res.status(200).json({
        token
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erreur interne du serveur"
      });
    }
  };
}