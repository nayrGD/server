import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StudentRepository } from "../repository/StudentRepository";

export class AuthService {
  constructor(
    private readonly studentRepository: StudentRepository
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<string | null> {
    const student = await this.studentRepository.findByEmail(email);

    if (!student) {
      return null;
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      student.password
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
        userId:student.id,
        email: student.email
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