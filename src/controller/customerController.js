const customerModel = require("../model/customerModel");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

const createCustomer = async function (req, res) {
  try {
    const data = req.body;
    const {
      title,
      fistName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      skills,
    } = data;

    // random 10 digits create
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const customerData = await customerModel.create({
      title,
      fistName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      gender,
      skills,
    });

    res.send({
      message: "customer created successfully",
      data: customerData,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginCustomer = async function (req, res) {
  try {
    const data = req.body;

    const { email, password } = data;

    if (!email) {
      res.send({ message: "please provide email" });
    }

    if (!password) {
      res.send({ message: "please provide a password" });
    }

    const checkEmail = await customerModel.findOne({ email: email });
    if (!checkEmail) {
      res.send({ message: "email doesn't exist, please login again" });
    }

    console.log("checkEmail", checkEmail);

    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      res.send({ message: "wrong password" });
    }

    res.send({ message: "login successful" });
  } catch (error) {
    console.log(error);
  }
};

const allCustomer = async function (req, res) {
  try {
    const customerData = await customerModel.find();
    const totalCount = await customerModel.countDocuments();
    res.send({
      message: "all customers fetch successfully",
      count: totalCount,
      data: customerData,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleCustomer = async function (req, res) {
  try {
    const { id } = req.params;
    const customerData = await customerModel.findOne({ _id: new ObjectId(id) });
    res.send({ message: "single customer details", data: customerData });
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const {
      title,
      fistName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      skills,
    } = data;

    const customerData = await customerModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        title,
        fistName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        skills,
      },
      { new: true }
    );
    res.send({ message: "customer updated successfully ", data: customerData });
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async function (req, res) {
  try {
    const { id } = req.params;
    const customerData = await customerModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.send({ message: "customer deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCustomer,
  allCustomer,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
};
