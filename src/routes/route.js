const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const productController = require("../controller/productController");
const middleware = require("../middleware/authentication");
//API
router.get(
  "/customer",
  middleware.demoMiddleware,
  customerController.allCustomer
);
// customer routes
router.get("/customer/:id", customerController.singleCustomer);
router.put("/customer/:id", customerController.updateCustomer);
router.delete("/customer/:id", customerController.deleteCustomer);
router.post("/login", customerController.loginCustomer);
router.post("/customer", customerController.createCustomer);

//oder routes
router.post("/order", productController.createOrder);
module.exports = router;
