const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const pacientePorcadastroId = {};

const { v4: uuidv4 } = require('uuid');

app.get('/cadastro/:id/pacientes', (req, res) => {
    res.status(200).send(pacientesPorcadastroID);
});

app.put('/cadastro/:id/pacientes', (req, res) => {
    const idPac = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const pacientePorcadastro =
    pacientePorcadastroId[req.params.id] || [];
    pacientePorcadastro.push({ id: idPac, texto });
    pacientePorcadastroId[req.params.id] =
    pacientePorcadastro;
    res.status(201).send(pacientePorcadastro);
})

app.listen(5000, (() => {
    console.log('Pacientes. Porta 5000');
}));