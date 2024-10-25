require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // inicializa
const Person = require('./models/Person');

// ler JSON / MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const router = require('./routes/personRoutes')
app.use('/person', router);
// rota inicial
app.get('/', (req, res) => {
    res.json({message: 'oi Express!'});

});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent( process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.0iiwm.mongodb.net/bancoapi?retryWrites=true&w=majority&appName=APICluster`
).then( () => {
        console.log("conectamos ao mongo db");
        app.listen(3000);
    }
).catch((erro) => console.log(erro));
