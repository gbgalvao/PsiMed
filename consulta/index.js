require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const mysql = require("mysql2");
const app = express();
app.use(express.json());


const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
const pool = mysql.createPool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Input de consultas
app.post("/paciente/:id/consulta", async (req, res) => {
  var consulta_id = Math.floor(Math.random() * 10000);//Gera ID da consulta
  var medico_id = req.body.medico_id;
  var paciente_id = req.params.id;
  var dataCon = req.body.dataCon;
  var hora = req.body.hora;

  const sql = "INSERT INTO tb_consulta (consulta_id, medico_id, paciente_id, dataCon, hora) VALUES (?, ?, ?, ?, ?)";
  pool.query(sql, [consulta_id, medico_id, paciente_id, dataCon, hora], (err, results, fields) => {
    res.json(results);
  });

  await axios.post("http://localhost:1000/eventos", {
        tipo: "ConsultaInserida",
        dados: {
        consulta_id,
        medico_id,    
        paciente_id,
        dataCon,
        hora
        },
    });
});

app.post("/consulta/:idCon", async (req, res) => {
  var consulta_id = req.params.idCon;
  var obs = req.body.obs;

  const sql = "INSERT INTO tb_consulta obs VALUES ? WHERE consulta_id=" + mysql.escape(consulta_id);
    pool.query(sql, obs, (err, results, fields) => {
      res.json(results);
    });

  await axios.post("http://localhost:1000/eventos", {
        tipo: "ConsultaInserida",
        dados: {   
        obs
        },
    });
}); 

//Requisição de todas as consultas
app.get("/consulta", (req, res) => {
  pool.query("SELECT * FROM tb_consulta", (err, results, fields) => {
    res.json(results);
    console.log(results);
  });
});

//Consultas por ID de usuário
app.get("/paciente/:id/consulta", async (req, res) => {
  var paciente_id = req.params.id
  pool.query("SELECT * FROM tb_consulta WHERE paciente_id=" + mysql.escape(paciente_id), (err, results, fields) => {
      res.json(results);
      console.log(results);
  });
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

const porta = 5000;
app.listen(porta, () => console.log(`Executando. Porta ${porta}`));