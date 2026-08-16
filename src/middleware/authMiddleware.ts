import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      message: "Token manquant"
    });
    return;
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      message: "Format du token invalide"
    });
    return;
  }

  const token = parts[1];

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      message: "JWT_SECRET est manquant"
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      !("email" in decoded)
    ) {
      res.status(401).json({
        message: "Token invalide"
      });
      return;
    }

    req.user = {
      userId: String(decoded.userId),
      email: String(decoded.email)
    };

    next();
  } catch {
    res.status(401).json({
      message: "Token invalide ou expiré"
    });
  }
}