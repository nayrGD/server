import { Request, Response } from "express";
import { EtudiantService } from "../service/EtudiantService.js";

export class EtudiantController {
  constructor(private service: EtudiantService) {}

  trouverTous = async (req: Request, res: Response): Promise<void> => {
    const etudiants = await this.service.trouverTous();

    res.json(etudiants);
  };

  trouverParId = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const etudiant = await this.service.trouverParId(id);

    if (etudiant === null) {
      res.status(404).json({
        message: "Étudiant non trouvé"
      });
      return;
    }

    res.json(etudiant);
  };

  creer = async (req: Request, res: Response): Promise<void> => {
    const { nom, age } = req.body;

    const etudiant = await this.service.creer(nom, age);

    res.status(201).json(etudiant);
  };

  modifier = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nom, age } = req.body;

    const etudiant = await this.service.modifier(
      id,
      nom,
      age
    );

    if (etudiant === null) {
      res.status(404).json({
        message: "Étudiant non trouvé"
      });
      return;
    }

    res.json(etudiant);
  };

  modifierPartiellement = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = Number(req.params.id);
    const { nom, age } = req.body;

    const etudiant = await this.service.modifierPartiellement(
      id,
      nom,
      age
    );

    if (etudiant === null) {
      res.status(404).json({
        message: "Étudiant non trouvé"
      });
      return;
    }

    res.json(etudiant);
  };

  supprimer = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const etudiant = await this.service.supprimer(id);

    if (etudiant === null) {
      res.status(404).json({
        message: "Étudiant non trouvé"
      });
      return;
    }

    res.status(204).send();
  };
}