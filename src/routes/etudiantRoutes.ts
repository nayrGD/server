import { Router } from "express";
import { EtudiantController } from "../controller/EtudiantController.js";

export const creerRoutesEtudiant = (
  controller: EtudiantController
): Router => {
  const router = Router();

  router.get("/", controller.trouverTous);
  router.get("/:id", controller.trouverParId);
  router.post("/", controller.creer);
  router.put("/:id", controller.modifier);
  router.patch("/:id", controller.modifierPartiellement);
  router.delete("/:id", controller.supprimer);

  return router;
};