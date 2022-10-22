const express = require ('express');
 const bodyParser = require('body-parser');
 const app = express();
 app.use(bodyParser.json());
 const consultaPorclientesId = {};
 const { v4: uuidv4 } = require('uuid');

 app.put('/clientes/:id/consulta', (req, res) => {
     const idObs = uuidv4();
     const { texto } = req.body;
     const consultaDosclientes =
     consultaPorclientesId[req.params.id] || [];
     consultaDosclientes.push({ id: idObs, texto });
     consultaPorclientesId[req.params.id] =
     consultaDosclientes;
     res.status(201).send(consultaDosclientes);
     });

 app.get('/clientes/:id/consulta', (req, res) => {

 });

 app.listen(5000, (() => {
 console.log('clientes. Porta 5000');
 }));