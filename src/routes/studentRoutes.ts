import { Router } from "express";
import { EtudiantController } from "../controller/studentController.js";

export const createEtudiantRoutes = (
  controller: EtudiantController
): Router => {
  const router = Router();

  router.get("/", controller.findAll);
  router.get("/:id", controller.findById);
  router.get("/email/:email", controller.findByEmail);

  return router;
};