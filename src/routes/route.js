const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
//API
router.post("/customer", customerController.createCustomer);

module.exports = router;
