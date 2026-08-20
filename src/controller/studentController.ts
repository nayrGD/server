import { Request, Response } from "express";
import { StudentService } from "../service/StudentService";

export class StudentController {
  constructor(private readonly service: StudentService) {}

  findAll = async (req: Request, res: Response): Promise<void> => {
    const student = await this.service.findAll();

    res.json(student);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student= await this.service.findById(id);

    if (student === null) {
      res.status(404).json({
        message: "student not found"
      });
      return;
    }

    res.json(student);
  };

  findByEmail = async (req: Request, res: Response): Promise<void> => {
    const email = Array.isArray(req.params.email)
      ? req.params.email[0]
      : req.params.email;

    const student = await this.service.findByEmail(email);

    if (student === null) {
      res.status(404).json({
        message: "student not found"
      });
      return;
    }

    res.json(student);
  };
}