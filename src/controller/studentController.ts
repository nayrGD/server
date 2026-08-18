import { Request, Response } from "express";
import { EtudiantService } from "../service/studentService.js";

export class EtudiantController {
  constructor(private readonly service: EtudiantService) {}

  findAll = async (req: Request, res: Response): Promise<void> => {
    const etudiants = await this.service.findAll();

    res.json(etudiants);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const etudiant = await this.service.findById(id);

    if (etudiant === null) {
      res.status(404).json({
        message: "Etudiant not found"
      });
      return;
    }

    res.json(etudiant);
  };

  findByEmail = async (req: Request, res: Response): Promise<void> => {
    const email = Array.isArray(req.params.email)
      ? req.params.email[0]
      : req.params.email;

    const etudiant = await this.service.findByEmail(email);

    if (etudiant === null) {
      res.status(404).json({
        message: "Etudiant not found"
      });
      return;
    }

    res.json(etudiant);
  };
}