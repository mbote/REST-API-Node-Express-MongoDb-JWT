const http = require('http');
const express = require('express');
const app = express();

const db = require('./db');
db();

const customerRouter = require('./router');

app.use(express.json());
app.use('/', customerRouter);

app.get('/api', (req,res)=>{
    res.json({
        success:1,
        message: "I am listing..."
    });
});

const server = http.createServer(app);
server.listen(3030);
console.log("Servidor escutando na porta 3030 ...")