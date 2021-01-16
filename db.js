
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
connectionString = 'mongodb://localhost/firstrest';

module.exports = function () {
    mongoose.connect(connectionString, connectionOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () => {
        console.log("DB Connected...");
    })
};