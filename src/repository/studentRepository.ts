import { Etudiant } from "../model/student.js";
import { Pool } from "pg";

export class EtudiantRepository {
  constructor(private readonly db: Pool) {}

  async findById(id: string): Promise<Etudiant | null> {
    const result = await this.db.query(
      `
      SELECT id, first_name, last_name, email, password
      FROM etudiants
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      password: row.password
    };
  }

  async findByEmail(email: string): Promise<Etudiant | null> {
    const result = await this.db.query(
      `
      SELECT id, first_name, last_name, email, password
      FROM etudiants
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      password: row.password
    };
  }

  async findAll(): Promise<Etudiant[]> {
    const result = await this.db.query(
      `
      SELECT id, first_name, last_name, email, password
      FROM etudiants
      `
    );

    return result.rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      password: row.password
    }));
  }
}