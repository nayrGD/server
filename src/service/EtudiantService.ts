import { Etudiant } from "../model/Etudiant.js";
import { EtudiantRepository } from "../repository/EtudiantRepository.js";

export class EtudiantService {
  constructor(private repository: EtudiantRepository) {}

  async trouverTous(): Promise<Etudiant[]> {
    return await this.repository.trouverTous();
  }

  async trouverParId(id: number): Promise<Etudiant | null> {
    return await this.repository.trouverParId(id);
  }

  async creer(nom: string, age: number): Promise<Etudiant> {
    return await this.repository.creer(nom, age);
  }

  async modifier(
    id: number,
    nom: string,
    age: number
  ): Promise<Etudiant | null> {
    return await this.repository.modifier(id, nom, age);
  }

  async modifierPartiellement(
    id: number,
    nom?: string,
    age?: number
  ): Promise<Etudiant | null> {
    const etudiant = await this.repository.trouverParId(id);

    if (etudiant === null) {
      return null;
    }

    const nouveauNom = nom ?? etudiant.nom;
    const nouvelAge = age ?? etudiant.age;

    return await this.repository.modifier(
      id,
      nouveauNom,
      nouvelAge
    );
  }

  async supprimer(id: number): Promise<Etudiant | null> {
    return await this.repository.supprimer(id);
  }
}