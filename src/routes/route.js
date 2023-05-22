const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const productController = require("../controller/productController");
const middleware = require("../middleware/authentication");
//API

router.post("/customer", customerController.createCustomer);

//get all customers
router.get(
  "/customer",
  middleware.authenticateToken,
  customerController.allCustomer
);
//single customer
router.get(
  "/customer/:id",
  middleware.authenticateToken,
  middleware.authorization,
  customerController.singleCustomer
);

router.put(
  "/customer/:customerId",
  middleware.authenticateToken,
  middleware.authorization,
  customerController.updateCustomer
);
router.delete(
  "/customer/:id",
  middleware.authenticateToken,
  middleware.authorization,
  customerController.deleteCustomer
);

router.post("/login", customerController.loginCustomer);

//oder routes
router.post(
  "/order",
  middleware.authenticateToken,
  middleware.authorization,
  productController.createOrder
);

// get all orders
// single order
//update order
//delete order

module.exports = router;
