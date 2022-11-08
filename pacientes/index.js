const express = require('express');
const app = express();
var pacientes = {};
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
app.use(bodyParser.json());
contador = 0;
const consultaPorpacientesId = {};
//const { v4: uuidv4 } = require('uuid');

app.get('/paciente', (req, res) => {
    res.status(200).send(pacientes);
});

app.get('/paciente/:id', (req, res) => {
    const cpf = req.params.id;
    res.status(200).send(pacientes[cpf]);
});

app.put('/paciente', async (req, res) => {
    const { cpf, nome, idade } = req.body;
    pacientes[cpf] = {
        cpf, nome, idade
    }
    
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCadastrado"
        /*
        dados: {
            cpf,
            nome,
            idade
        },
        */
    })    
    

    res.status(201).send(pacientes[cpf]);
});



app.listen(4000, (() => {
    console.log('Pacientes. Porta 4000');
}));
