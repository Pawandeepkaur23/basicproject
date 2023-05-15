const productModel = require("../model/productModel");
const customerModel = require("../model/customerModel");

const createOrder = async function (req, res) {
  try {
    const data = req.body;

    const { productName, productSize, productPrice, customerId } = data;

    var customerData = await customerModel.findOne({ _id: customerId });
    console.log(customerData, "customerData");

    var orderData = await productModel.create({
      productName,
      productSize,
      productPrice,
      customerId,
    });
    res.send({ message: "order created successfully", data: orderData });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createOrder };
