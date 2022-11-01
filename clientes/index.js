const express = require('express');
const app = express();
var pacientes = {};
const bodyParser = require('body-parser');
app.use(bodyParser.json());
contador = 0;
const consultaPorpacientesId = {};
//const { v4: uuidv4 } = require('uuid');

app.get('/paciente', (req, res) => {
    res.status(200).send(pacientes);
});

app.get('/paciente/:id', (req, res) => {
    res.status(200).send(pacientes[req.params.id]);
});

app.put('/paciente', (req, res) => {
    contador++;
    const { cpf, nome, idade } = req.body;
    pacientes[contador] = {
        cpf, nome, idade
    }
    res.status(201).send(pacientes[contador]);
});


/*
app.put('/paciente/:id', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const consultaDospacientes =
        consultaPorpacientesId[req.params.id] || [];
    consultaDospacientes.push({ id: idObs, texto });
    consultaPorpacientesId[req.params.id] =
        consultaDospacientes;
    res.status(201).send(consultaDospacientes);
});
*/

app.listen(4000, (() => {
    console.log('Pacientes. Porta 4000');
}));
