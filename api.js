const http = require('http');
const express = require('express');
const app = express();

const db = require('./db');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const SECRET = 'mysecret';

app.get('/', (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
})

app.get('/clientes', verifyJWT, (req, res, next) => {
    console.log("Retornou todos clientes!");
    res.json([{ id: 1, nome: 'luiz' }]);
})

//authentication
app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if (req.body.user === 'luiz' && req.body.password === 123) {
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: 'Login inválido!' });
})

app.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    }); 
}

app.get('/customers', verifyJWT, function (req, res, next) {
    var db = require('./db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});


app.get('/customers/:id', function (req, res, next) {
    var db = require('./db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: req.params.id }).lean().exec(function (e, docs) {
        res.json(docs);
        res.end();
    });
});


app.post('/customers/', function (req, res, next) {
  //  var db = require('./db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    var newcustomer = new Customer({ name: req.body.name, email: req.body.email });
    newcustomer.save(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(newcustomer);
        res.end();
    });
});

app.put('/customers/:id', function (req, res, next) {
    var db = require('./db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
        res.end();
    });
});

app.delete('/customers/:id', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json({success: true});
        res.end();
    });
});

const server = http.createServer(app);
server.listen(3030);
console.log("Servidor escutando na porta 3030 ...")