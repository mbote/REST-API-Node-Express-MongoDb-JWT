
const router = require('express').Router();
const customerController = require('./controller');

router.get('/getCustomers', customerController.getAll);
router.get('/getCustomer/:id', customerController.getCusomer);
router.post('/addCustomer', customerController.create);
router.delete('/deleteCustomer/:id', customerController.deleteCustomer);
router.put('/updateCustomer/:id', customerController.UpdateCustomer);

module.exports = router;