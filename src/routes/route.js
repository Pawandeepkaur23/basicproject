const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const middleware = require("../middleware/authentication");
//API
router.get(
  "/customer",
  middleware.demoMiddleware,
  customerController.allCustomer
);

router.get("/customer/:id", customerController.singleCustomer);
router.put("/customer/:id", customerController.updateCustomer);
router.delete("/customer/:id", customerController.deleteCustomer);
router.post("/login", customerController.loginCustomer);
router.post("/customer", customerController.createCustomer);

module.exports = router;
