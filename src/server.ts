import express from "express";
import "express-async-errors";
import morgan from "morgan";

const app = express();
const port = 3000;

type Usuario = {
  id: number;
  name: string;
  city: string;
};

type BaseDeDatos = Usuario[];

let baseDeDatos: BaseDeDatos = [
  {
    id: 1,
    name: "Real Madrid",
    city: "Madrid",
  },
  {
    id: 2,
    name: "Barcelona FC",
    city: "Barcelona",
  },
  {
    id: 3,
    name: "Deportivo",
    city: "A coruña",
  },
  {
    id: 4,
    name: "Leganés",
    city: "Madrid",
  },
  {
    id: 5,
    name: "Betis",
    city: "Sevilla",
  },
];

app.use(morgan("dev"));
app.use(express.json());

app.get("/prueba/", (req, res) => {
  res.status(200).json(baseDeDatos);
  console.log(baseDeDatos);
});

app.get("/prueba/:id", (req, res) => {
  const { id } = req.params;
  const usuario = baseDeDatos.find((u) => u.id === Number(id));
  res.status(200).json(usuario);
  console.log(usuario);
});

app.post("/prueba/", (req, res) => {
  const { id, name, city } = req.body;
  const nuevoUsuario = { id, name, city };
  baseDeDatos = [...baseDeDatos, nuevoUsuario];
  res.status(201).json({ msg: "el usuario se ha creado correctamente" });
  console.log(baseDeDatos);
});

app.put("/prueba/:id", (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  baseDeDatos = baseDeDatos.map((u) =>
    u.id === Number(id) ? { ...u, name, city } : u
  );
  res.status(200).json({ msg: "el usuario se ha modificado correctamente" });
  console.log(baseDeDatos);
});

app.delete("/prueba/:id", (req, res) => {
  const { id } = req.params;
  baseDeDatos = baseDeDatos.filter((u) => u.id !== Number(id));
  res.status(200).json({ msg: "el usuario se ha borrado correctamente" });
  console.log(baseDeDatos);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
