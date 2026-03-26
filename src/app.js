const express = require("express");
const cors = require("cors");
const createTable = require("./initDb");
const usuariosRoutes = require("./routes/usuarios.routes");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Crear tabla
createTable();

// Usar rutas
app.use("/api", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});