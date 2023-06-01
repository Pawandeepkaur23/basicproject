const customerModel = require("../model/customerModel");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const { password: omit, ...responseData } = customerData._doc;

    res.status(201).send({
      message: "customer created successfully",
      data: responseData,
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
      res.status(400).send({ message: "please provide email" });
    }

    if (!password) {
      res.status(400).send({ message: "please provide a password" });
    }

    const checkEmail = await customerModel.findOne({ email: email });
    if (!checkEmail) {
      res
        .status(404)
        .send({ message: `${email} doesn't exist, please login again` });
      // .send({ message: "email doesn't exist, please login again " });
    }

    console.log("checkEmail", checkEmail._id);

    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      res.status(400).send({ message: "wrong password please try again" });
    }

    const token = jwt.sign(
      {
        customerId: checkEmail._id,
      },
      "Secrete_Key",
      { expiresIn: "1h" }
    );

    res.send({ message: "login successful", data: token });
  } catch (error) {
    console.log(error);
  }
};

// const allCustomer = async function (req, res) {
//   try {
//     const { gender } = req.query;
//     const customerData = await customerModel.find({gender:gender});
//     // find({ email: email });
//     // .sort({ createdAt: 1 })
//     // .select({ phoneNumber: 0 });

//     // Date, number
//     const totalCount = await customerModel.countDocuments();
//     res.status(200).send({
//       message: "all customers fetch successfully",
//       count: totalCount,
//       data: customerData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const allCustomer = async function (req, res) {
  try {
    const { query } = req;
    const { keyword } = req.query;

    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;

    //fetchSize/viewSize

    const searchCriteria = {};
    if (req.query.title) {
      searchCriteria.title = req.query.title; // status=> Active, inActive  // gender => male, female  // isActive => true, false
    }
    // const searchCriteria = {};
    // if (req.query.gender) {
    //   searchCriteria.gender = req.query.gender; // status=> Active, inActive  // gender => male, female  // isActive => true, false
    // }

    if (req.query.keyword) {
      searchCriteria["$or"] = [
        { fistName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { lastName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { email: { $regex: `^${keyword.trim()}`, $options: "i" } },
      ];
    }

    const customerData = await customerModel.aggregate([
      { $match: searchCriteria },
      {
        $sort: {
          createdAt: 1,
        },
      },

      {
        $facet: {
          data: [{ $skip: startIndex }, { $limit: fetchSize }],
          count: [{ $count: "total" }],
        },
      },
    ]);

    // customerData = [
    //   {
    //    data:[] => 0
    //    count:[] => 0
    //  }
    // ]

    res.status(200).send({
      status: true,
      message: "all customer fetch successfully",
      count: customerData[0]?.count[0]?.total,
      data: customerData[0]?.data,
    });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

const singleCustomer = async function (req, res) {
  try {
    const { id } = req.params;
    const customerData = await customerModel.findOne({ _id: new ObjectId(id) });
    res
      .status(200)
      .send({ message: "single customer details", data: customerData });
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async function (req, res) {
  try {
    const { customerId } = req.params;
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
      { _id: new ObjectId(customerId) },
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
