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
  //se todas as conexões estiverem ocupadas, novos solicitantes esperam numa fila
  //se configurado com false, causa um erro quando recebe requisições e todas
  //as conexões estão ocupadas
  waitForConnections: true,
  //no máximo 10 conexões. Elas são abertas sob demanda e não no momento de
  //construção do pool
  connectionLimit: 10,
  //quantos solicitantes podem aguardar na fila? 0 significa que não há limite
  queueLimit: 0
});

app.post("/consulta", async (req, res) => {
  var consulta_id = Math.floor(Math.random() * 10000);
  var medico_id = req.body.medico_id;
  var paciente_id = req.body.paciente_id;
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

app.get("/consulta", (req, res) => {
  pool.query("SELECT * FROM tb_consulta", (err, results, fields) => {
    res.json(results);
    console.log(results);
  });
});

app.get("/consulta/:id", async (req, res) => {
  var consulta_id = req.params.id;
  pool.query("SELECT * FROM tb_consulta WHERE consulta_id=" + mysql.escape(consulta_id), (err, results, fields) => {
      res.json(results);
      console.log(results);
  });
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

const porta = 7000;
app.listen(porta, () => console.log(`Executando. Porta ${porta}`));