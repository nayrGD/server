import express from "express";
import { Pool } from "pg";

const app = express();

app.use(express.json());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "etudiants_db",
  password: "ubuntu",
  port: 5432
});

db.query(`
  CREATE TABLE IF NOT EXISTS etudiants (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`)
  .then(() => console.log("Table etudiants prête"))
  .catch((err: Error) => console.error(err));

app.get("/etudiants", async (req: any, res: any) => {
  const result = await db.query("SELECT * FROM etudiants");
  res.json(result.rows);
});

app.get("/etudiants/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  const result = await db.query(
    "SELECT * FROM etudiants WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Étudiant non trouvé"
    });
  }

  res.json(result.rows[0]);
});

app.post("/etudiants", async (req: any, res: any) => {
  const { nom, age } = req.body;

  const result = await db.query(
    "INSERT INTO etudiants (nom, age) VALUES ($1, $2) RETURNING *",
    [nom, age]
  );

  res.status(201).json(result.rows[0]);
});

app.put("/etudiants/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);
  const { nom, age } = req.body;

  const result = await db.query(
    `UPDATE etudiants
     SET nom = $1, age = $2
     WHERE id = $3
     RETURNING *`,
    [nom, age, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Étudiant non trouvé"
    });
  }

  res.json(result.rows[0]);
});

app.patch("/etudiants/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  const ancien = await db.query(
    "SELECT * FROM etudiants WHERE id = $1",
    [id]
  );

  if (ancien.rows.length === 0) {
    return res.status(404).json({
      message: "Étudiant non trouvé"
    });
  }

  const etudiant = ancien.rows[0];

  const nom = req.body.nom ?? etudiant.nom;
  const age = req.body.age ?? etudiant.age;

  const result = await db.query(
    `UPDATE etudiants
     SET nom = $1, age = $2
     WHERE id = $3
     RETURNING *`,
    [nom, age, id]
  );

  res.json(result.rows[0]);
});

app.delete("/etudiants/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  const result = await db.query(
    "DELETE FROM etudiants WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Étudiant non trouvé"
    });
  }

  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
