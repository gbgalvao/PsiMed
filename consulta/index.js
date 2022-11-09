const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var consultas = {};

app.put("/consulta/:paciente", (req, res) => {
  const { data, medico } = req.body;
  consultas[req.params.paciente] = {
    data,
    medico,
  };
  res.status(201).send(consultas[req.params.paciente]);
});

app.get("/consulta", (req, res) => {
  res.status(200).send(consultas);
});

app.get("/consulta/:id/paciente", (req, res) => {
  res.status(200).send(consultas[req.params.id]);
});

app.listen(5000, () => {
  console.log("Pacientes. Porta 5000");
});
