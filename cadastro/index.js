const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const cadastro = {};
contador = 0

app.get('/cadastro', (req, res) => {
    res.send(cadastro);
});

app.put('/cadastro', (req, res) => {
    contador++
    const { cpf, nome, idade } = req.body;
    cadastro[contador] = {
        cpf, nome, idade
    }
    res.status(201).send(cadastro[contador]);
})

app.listen(4000, () => {
    console.log('Cadastro. Porta 4000');
})