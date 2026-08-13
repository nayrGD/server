import { Pool } from "pg";
import { Etudiant } from "../model/Etudiant.js";

export class EtudiantRepository {
  constructor(private db: Pool) {}

  async trouverTous(): Promise<Etudiant[]> {
    const result = await this.db.query(
      "SELECT * FROM etudiants"
    );

    return result.rows;
  }

  async trouverParId(id: number): Promise<Etudiant | null> {
    const result = await this.db.query(
      "SELECT * FROM etudiants WHERE id = $1",
      [id]
    );

    return result.rows.length === 0 ? null : result.rows[0];
  }

  async creer(nom: string, age: number): Promise<Etudiant> {
    const result = await this.db.query(
      "INSERT INTO etudiants (nom, age) VALUES ($1, $2) RETURNING *",
      [nom, age]
    );

    return result.rows[0];
  }

  async modifier(
    id: number,
    nom: string,
    age: number
  ): Promise<Etudiant | null> {
    const result = await this.db.query(
      `UPDATE etudiants
       SET nom = $1, age = $2
       WHERE id = $3
       RETURNING *`,
      [nom, age, id]
    );

    return result.rows.length === 0 ? null : result.rows[0];
  }

  async supprimer(id: number): Promise<Etudiant | null> {
    const result = await this.db.query(
      "DELETE FROM etudiants WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows.length === 0 ? null : result.rows[0];
  }
}