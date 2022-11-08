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
 //envia o evento para o microsserviço de pacientes
 axios.post('http://localhost:4000/eventos', evento);
 //envia o evento para o microsserviço de consulta
 axios.post('http://localhost:5000/eventos', evento);

 res.status(200).send({ msg: "ok" });
 });

 app.get('/eventos', (req,res) =>{
    res.send(eventos)
 })

 app.listen(10000, () => {
 console.log('Barramento de eventos. Porta 10000.')
 })