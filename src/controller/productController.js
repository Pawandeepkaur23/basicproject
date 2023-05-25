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

const getAllOrder = async (req, res) => {
  try {
    const data = await productModel
      .find()
      .select({ productName: 1, productSize: 1, _id: 0 });
    // .find({ productPrice: { $lt: 2000 } })
    // .sort({ productPrice: 1 });

    res.send({ message: "all order fetch successfully", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder, getAllOrder };

//filter => $lt: less than , $lte: less than and  equal, $gt: greater than , $gte: greater than and equal, $eq: equal

// {
//   "_id": "6462167b8d713fdc9d66f783",
// "productName": "Jacket",
// "productSize": "L",
//   "productPrice": 5000,
//   "customerId": "645cd16c9233f635463ada41",
//   "createdAt": "2023-05-15T11:24:43.394Z",
//   "updatedAt": "2023-05-15T11:24:43.394Z",
//   "__v": 0
// },

// =>
// "productName": "Jacket",
// "productSize": "L",

//create=> date insertion method

//mongoDB quaries
//find => return array of object
//findOne => return object => return first document with matching its condition (query) on  the basis of time
//findById => return object => return matched document
//findOneAndUpdate => return object => return first document with matching on  the basis of time => update
//findOneAndDelete => return object => return first document with matching on the basis
//findByIdAndUpdate => return object => return first document with matching on the basis
//findByIdAndDelete =>
//updateMany
