const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const eventos = []

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
   const evento = req.body;
   eventos.push(evento)
   //envia o evento para o microsserviço de cadastro
   axios.post('http://localhost:4000/eventos', evento);
   //envia o evento para o microsserviço de medico
   axios.post('http://localhost:5000/eventos', evento);
   //envia o evento para o microsserviço de paciente
   axios.post('http://localhost:2000/eventos', evento);
   //envia o evento para o microsserviço de consulta
   axios.post('http://localhost:7000/eventos', evento);

   res.status(200).send({ msg: "ok" });
 });

 app.get('/eventos', (req,res) =>{
   const evento = req.body;
   //envia o evento para o microsserviço de paciente
   axios.get('http://localhost:2000/eventos', evento);
   res.json(evento);
 })

 const porta = 1000;
 app.listen(porta, () => console.log(`Executando. Porta ${porta}`));