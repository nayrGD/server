import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EtudiantRepository } from "../repository/EtudiantRepository.js";

export class AuthService {
  constructor(
    private readonly etudiantRepository: EtudiantRepository
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<string | null> {
    const etudiant = await this.etudiantRepository.findByEmail(email);

    if (!etudiant) {
      return null;
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      etudiant.password
    );

    if (!passwordCorrect) {
      return null;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET est manquant");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

    const token = jwt.sign(
      {
        userId: etudiant.id,
        email: etudiant.email
      },
      secret,
      {
        expiresIn: expiresIn as jwt.SignOptions["expiresIn"]
      }
    );

    return token;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}