import { Etudiant } from "../model/Etudiant.js";
import { EtudiantRepository } from "../repository/EtudiantRepository.js";

export class EtudiantService {
  constructor(private readonly repository: EtudiantRepository) {}

  async findAll(): Promise<Etudiant[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Etudiant | null> {
    return await this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<Etudiant | null> {
    return await this.repository.findByEmail(email);
  }
}