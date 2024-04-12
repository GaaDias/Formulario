var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// modelo do banco de dados
const Formulario = mongoose.model('Formulario', {
    nome: String,
    sobrenome: String,
    email: String,
    telefone: String,
    cidade: String,
    volume: Number,
    opcoes: String, // opcao escolhida radio button
    checkboxOpcoes: [String],
    caixaTexto: String,
    concordouPolitica: Boolean
});

app.post("/enviar", (req, res) => {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var cidade = req.body.cidade;
    var volume = req.body.volume;
    var opcoes = req.body.opcoes; // Capturando a opção selecionada pelos radio buttons
    var checkboxOpcoes = req.body.checkboxOpcoes ? req.body.checkboxOpcoes : []; // Capturando as opções selecionadas pelos checkboxes
    var caixaTexto = req.body.caixaTexto;
    var concordouPolitica = req.body.concordouPolitica === 'on';

    var formularioData = new Formulario({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        cidade: cidade,
        volume: volume,
        opcoes: opcoes,
        checkboxOpcoes: checkboxOpcoes,
        caixaTexto: caixaTexto,
        concordouPolitica: concordouPolitica
    });

    formularioData.save()
        .then(() => {
            console.log("Dados do formulário salvos com sucesso!");
            res.redirect('index.html'); // redirecionamento pós-envio voltando para o formulario
        })
        .catch((err) => {
            console.error("Erro ao salvar os dados do formulário:", err);
            res.status(500).send("Erro interno ao salvar os dados do formulário.");
        });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
}).listen(3000);

console.log("Listening on port 3000");
