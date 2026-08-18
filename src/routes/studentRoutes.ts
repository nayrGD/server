import { Router } from "express";
import { StudentController } from "../controller/studentController";

export const createStudentRoutes = (
  controller: StudentController
): Router => {
  const router = Router();

  router.get("/", controller.findAll);
  router.get("/:id", controller.findById);
  router.get("/email/:email", controller.findByEmail);

  return router;
};