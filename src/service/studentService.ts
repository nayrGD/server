import { Student } from "../model/student";
import { StudentRepository } from "../repository/StudentRepository";

export class StudentService {
  constructor(private readonly repository: StudentRepository) {}

  async findAll(): Promise<Student[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Student | null> {
    return await this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<Student| null> {
    return await this.repository.findByEmail(email);
  }
}