const express = require ('express');
const app = express();
const clientes = {};
const bodyParser = require('body-parser');
app.use(bodyParser.json());
contador = 0;

app.get ('/clientes', (req, res) => {
    res.send(clientes);});

    app.put('/clientes', (req, res) => {
        contador++;
        const { texto } = req.body;
        clientes[contador] = {
        contador, texto
        }
        res.status(201).send(clientes[contador]);
        });

 app.listen(4000, () => {
 console.log('clientes. Porta 4000');
 });