
const customerService = require('./service');

module.exports = {
    getAll,
    create,
    getCusomer,
    deleteCustomer,
    UpdateCustomer
};

function getAll(req, res) {
    customerService.getAll()
        .then((customers) => {
            res.status(200).send(customers);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occured",
            });
        });
}

function create(req, res) {
    const body = req.body;
    customerService.create(body).then(result => {
        if (result) {
            res.json({
                success: 1,
                message: "Data insert SuccessFully...",
                data: result
            });
        } else {
            res.json({
                success: 0,
                message: "Failed to insert Data...",
            });
        }
    })
}

function getCusomer(req, res){
    customerService.getCustomerById(req.params.id)
        .then((customers) => {
            if (!customers) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id,
                });
            }
            res.status(200).send(customers);
            console.log(customers);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id,
            });
        });
};


function deleteCustomer (req, res) {
    customerService.deleteCustomer(req.params.id)
        .then((customers) => {
            if (!customers) {
                return res.status(404).send({
                    message: "User not found ",
                });
            }
            res.send({ message: "User deleted successfully!" });
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete user ",
            });
        });
};

function UpdateCustomer(req, res){
    if (!req.body.email || !req.body.name) {
        res.status(400).send({
            message: "required fields cannot be empty",
        });
    }
    customerService.update(req.params.id, req.body, { new: true })
        .then((customers) => {
            if (!customers) {
                return res.status(404).send({
                    message: "no customers found",
                });
            }
            res.status(200).send(customers);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the post",
            });
        });
};

