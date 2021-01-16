const mongoose = require('mongoose');
const schema = mongoose.Schema;
const customerSchema = new schema({
    name:  String,
    email: String
});
module.exports = mongoose.model("customers", customerSchema);