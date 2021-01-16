
const db = require('./db');
const model = require('./model')

module.exports = { getAll, create, getCustomerById,update, deleteCustomer};

async function getAll() {
    const customers =  model.find();
    return customers;
}

async function create(data){
    return model.create(data);
}

async function getCustomerById(id){
    return model.findById(id);
}

async function update(id,data){
    return model.findByIdAndUpdate(id,data);
}

async function deleteCustomer(id){
    return model.findByIdAndRemove(id);
}