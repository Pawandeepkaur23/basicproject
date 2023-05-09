const customerModel = require("../model/customerModel");

const createCustomer = async function (req, res) {
  try {
    const data = req.body;
    const { title, fistName, lastName, email, password, phoneNumber, gender } =
      data;

    const customerData = await customerModel.create({
      title,
      fistName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
    });

    res.send({
      message: "customer created successfully",
      data: customerData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createCustomer };
